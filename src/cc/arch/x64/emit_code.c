#include "../../../config.h"
#include "./arch_config.h"
#include "emit_code.h"

#include <assert.h>
#include <inttypes.h>  // PRId64
#include <stdlib.h>
#include <string.h>

#include "ast.h"
#include "cc_misc.h"
#include "codegen.h"
#include "ir.h"
#include "lexer.h"
#include "regalloc.h"
#include "table.h"
#include "type.h"
#include "util.h"
#include "var.h"
#include "x64.h"

int count_callee_save_regs(unsigned long used, unsigned long fused);

char *im(int64_t x) {
  return fmt("$%" PRId64, x);
}

char *indirect(const char *base, const char *index, int scale) {
  if (index == NULL) {
    return fmt("(%s)", base);
  } else {
    if (scale == 1)
      return fmt("(%s,%s)", base, index);
    else
      return fmt("(%s,%s,%d)", base, index, scale);
  }
}

char *offset_indirect(int offset, const char *base, const char *index, int scale) {
  if (offset == 0)
    return indirect(base, index, scale);

  if (index == NULL) {
    return fmt("%d(%s)", offset, base);
  } else {
    if (scale == 1)
      return fmt("%d(%s,%s)", offset, base, index);
    else
      return fmt("%d(%s,%s,%d)", offset, base, index, scale);
  }
}

char *label_indirect(const char *label, int64_t offset, const char *reg) {
  if (offset > 0) {
    return fmt("%s+%" PRId64 "(%s)", label, offset, reg);
  } else if (offset < 0) {
    return fmt("%s-%" PRId64 "(%s)", label, -offset, reg);
  }
  return fmt("%s(%s)", label, reg);
}

char *gotpcrel(char *label) {
  return fmt("%s@GOTPCREL", label);
}

////////////////////////////////////////////////

static bool is_asm(Stmt *stmt) {
  return stmt->kind == ST_ASM;
}

static void move_params_to_assigned(Function *func) {
  extern const char *kRegSizeTable[][PHYSICAL_REG_MAX];
  extern const int ArchRegParamMapping[];
  extern const char *kFReg64s[];

  static const char *kRegParam8s[] = {DIL, SIL, DL, CL, R8B, R9B};
  static const char *kRegParam16s[] = {DI, SI, DX, CX, R8W, R9W};
  static const char *kRegParam32s[] = {EDI, ESI, EDX, ECX, R8D, R9D};
  static const char *kRegParam64s[] = {RDI, RSI, RDX, RCX, R8, R9};
  static const char **kRegParamTable[] = {kRegParam8s, kRegParam16s, kRegParam32s, kRegParam64s};
  static const char *kFRegParam64s[] = {XMM0, XMM1, XMM2, XMM3, XMM4, XMM5, XMM6, XMM7};
  static const int kPow2Table[] = {-1, 0, 1, -1, 2, -1, -1, -1, 3};
#define kPow2TableSize ((int)ARRAY_SIZE(kPow2Table))

  RegParamInfo iparams[MAX_REG_ARGS];
  RegParamInfo fparams[MAX_FREG_ARGS];
  int iparam_count = 0;
  int fparam_count = 0;
  enumerate_register_params(func, iparams, MAX_REG_ARGS, fparams, MAX_FREG_ARGS,
                            &iparam_count, &fparam_count);

  // Generate code to store parameters to the destination.
  for (int i = 0; i < iparam_count; ++i) {
    RegParamInfo *p = &iparams[i];
    VReg *vreg = p->vreg;
    size_t size = type_size(p->type);
    assert(0 < size && size < kPow2TableSize && kPow2Table[size] >= 0);
    int pow = kPow2Table[size];
    const char *src = kRegParamTable[pow][p->index];
    if (vreg->flag & VRF_SPILLED) {
      int offset = vreg->frame.offset;
      assert(offset != 0);
      MOV(src, OFFSET_INDIRECT(offset, RBP, NULL, 1));
    } else if (ArchRegParamMapping[p->index] != vreg->phys) {
      const char *dst = kRegSizeTable[pow][vreg->phys];
      MOV(src, dst);
    }
  }
  for (int i = 0; i < fparam_count; ++i) {
    RegParamInfo *p = &fparams[i];
    VReg *vreg = p->vreg;
    const char *src = kFRegParam64s[p->index];
    if (vreg->flag & VRF_SPILLED) {
      int offset = vreg->frame.offset;
      assert(offset != 0);
      const char *dst = OFFSET_INDIRECT(offset, RBP, NULL, 1);
      switch (p->type->flonum.kind) {
      case FL_FLOAT:   MOVSS(src, dst); break;
      case FL_DOUBLE: case FL_LDOUBLE:
        MOVSD(src, dst);
        break;
      }
    } else {
      if (p->index != vreg->phys) {
        const char *dst = kFReg64s[vreg->phys];
        switch (p->type->flonum.kind) {
        case FL_FLOAT:   MOVSS(src, dst); break;
        case FL_DOUBLE: case FL_LDOUBLE:
          MOVSD(src, dst);
          break;
        }
      }
    }
  }

  if (func->type->func.vaargs) {
    for (int i = iparam_count; i < MAX_REG_ARGS; ++i) {
      int offset = (i - MAX_REG_ARGS - MAX_FREG_ARGS) * TARGET_POINTER_SIZE;
      MOV(kRegParam64s[i], OFFSET_INDIRECT(offset, RBP, NULL, 1));
    }
#ifndef __NO_FLONUM
    for (int i = fparam_count; i < MAX_FREG_ARGS; ++i) {
      int offset = (i - MAX_FREG_ARGS) * TARGET_POINTER_SIZE;
      MOVSD(kFRegParam64s[i], OFFSET_INDIRECT(offset, RBP, NULL, 1));
    }
#endif
  }
}

void emit_defun(Function *func) {
  if (func->scopes == NULL ||  // Prototype definition.
      func->extra == NULL)     // Code emission is omitted.
    return;

  emit_comment(NULL);
  _TEXT();

  bool global = true;
  const VarInfo *varinfo = scope_find(global_scope, func->name, NULL);
  if (varinfo != NULL) {
    global = (varinfo->storage & VS_STATIC) == 0;
  }

  {
    char *label = format_func_name(func->name, global);
    if (global)
      _GLOBL(label);
    else
      _LOCAL(label);
    EMIT_ALIGN(2);
#if XCC_TARGET_PLATFORM != XCC_PLATFORM_APPLE
    EMIT_ASM(".type", quote_label(fmt_name(func->name)), "@function");
#endif
    EMIT_LABEL(label);
  }
  ENDBR64();

  bool no_stmt = true;
  if (func->body_block != NULL) {
    Vector *stmts = func->body_block->block.stmts;
    for (int i = 0; i < stmts->len; ++i) {
      Stmt *stmt = stmts->data[i];
      if (stmt == NULL)
        continue;
      if (!is_asm(stmt)) {
        no_stmt = false;
        break;
      }
    }
  }

  // Prologue
  // Allocate variable bufer.
  FuncBackend *fnbe = func->extra;
  size_t frame_size = 0;
  bool rbp_saved = false;
  int callee_saved_count = 0;
  if (!no_stmt) {
    // Callee save.
    callee_saved_count = push_callee_save_regs(fnbe->ra->used_reg_bits, fnbe->ra->used_freg_bits);

    // When function is called, return address is pused onto the stack by caller,
    // so default offset is 8.
    size_t frame_offset = TARGET_POINTER_SIZE + callee_saved_count * TARGET_POINTER_SIZE;

    if (fnbe->frame_size > 0 || fnbe->ra->flag & RAF_STACK_FRAME) {
      PUSH(RBP);
      MOV(RSP, RBP);
      rbp_saved = true;
      // RBP is pushed so tweak offset.
      frame_offset += TARGET_POINTER_SIZE;
    }

    if (func->funcalls->len > 0 || (func->flag & FUNCF_STACK_MODIFIED)) {
      // Align frame size to 16 only it contains funcall.
      size_t stack_work_size = fnbe->stack_work_size;
      if (func->flag & FUNCF_STACK_MODIFIED)
        stack_work_size = ALIGN(stack_work_size, 16);
      frame_size = fnbe->frame_size + stack_work_size;
      frame_size += -(frame_size + frame_offset) & 15;
    } else {
      frame_size = fnbe->frame_size + fnbe->stack_work_size;
    }
    if (frame_size > 0) {
      SUB(IM(frame_size), RSP);
    }

    move_params_to_assigned(func);
  }

  emit_bb_irs(fnbe->bbcon);

  if (!function_not_returned(fnbe)) {
    // Epilogue
    if (!no_stmt) {
      if (rbp_saved) {
        MOV(RBP, RSP);
        POP(RBP);
      } else if (frame_size > 0) {
        ADD(IM(frame_size), RSP);
      }

      pop_callee_save_regs(fnbe->ra->used_reg_bits, fnbe->ra->used_freg_bits);
    }

    RET();
  }

  // Static variables are emitted through global variables.
}
