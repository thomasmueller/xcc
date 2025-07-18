#include "../config.h"
#include <assert.h>
#include <stdlib.h>
#include <string.h>

#ifndef __NO_FLONUM
#include <math.h>
#endif

#include "ast.h"
#include "be_aux.h"
#include "codegen.h"
#include "fe_misc.h"
#include "ir.h"
#include "parser.h"
#include "regalloc.h"
#include "table.h"
#include "type.h"
#include "util.h"
#include "var.h"

static Expr *proc_builtin_classify_type(const Token *ident) {
  consume(TK_LPAR, "`(' expected");
  const Type *type = parse_var_def(NULL, NULL, NULL);
  if (type == NULL) {
    Expr *expr = parse_expr();
    type = expr->type;
  }
  consume(TK_RPAR, "`)' expected");

  return new_expr_fixlit(&tySize, ident, type->kind);
}

#ifndef __NO_FLONUM
static Expr *proc_builtin_nan(const Token *ident) {
  consume(TK_LPAR, "`(' expected");
  Expr *fmt = parse_expr();
  consume(TK_RPAR, "`)' expected");

  uint64_t significand = 0;
  if (fmt->kind == EX_STR) {
    const char *p = fmt->str.buf;
    int base = 10;
    if (p[0] == '0' && (p[1] == 'x' || p[1] == 'X')) {
      p += 2;
      base = 16;
    }
    significand = strtoull(p, NULL, base);
  } else {
    parse_error(PE_NOFATAL, fmt->token, "String literal expected");
  }

  const uint64_t MASK = (1UL << 52) - 1UL;
  union { double d; uint64_t q; } u;
  u.d = NAN;
  u.q = (u.q & ~MASK) | (significand & MASK);
  return new_expr_flolit(&tyDouble, ident, u.d);
}
#endif

#if VAARG_ON_STACK
static VReg *gen_builtin_va_start(Expr *expr) {
  assert(expr->kind == EX_FUNCALL);
  Vector *args = expr->funcall.args;
  assert(args->len == 2);
  assert(curfunc != NULL);

  Expr *ap = args->data[0];
  if (ap->kind != EX_VAR || ap->type->kind != TY_PTR) {
    parse_error(PE_NOFATAL, ap->token, "Must be local variable");
    return NULL;
  }

  Scope *scope;
  const VarInfo *varinfo = scope_find(ap->var.scope, ap->var.name, &scope);
  assert(varinfo != NULL);
  if (is_global_scope(scope) || !is_local_storage(varinfo)) {
    parse_error(PE_NOFATAL, ap->token, "Must be local variable");
    return NULL;
  }

  Expr *var = strip_cast(args->data[1]);
  // if (var->kind == EX_REF)
  //   var = var->unary.sub;

  const Vector *params = curfunc->params;
  assert(params != NULL);
  assert(params->len > 0);

  bool is_last = false;
  if (var->kind == EX_VAR) {
    assert(curfunc->type->func.vaargs);
    VarInfo *varinfo = params->data[params->len - 1];
    is_last = equal_name(var->var.name, varinfo->ident->ident);
  }
  if (!is_last) {
    parse_error(PE_NOFATAL, var->token, "Must be last function argument");
    return NULL;
  }

  int offset = 0;
  int gn = 0, fn = 0;
  for (int i = 0; i < params->len; ++i) {
    VarInfo *info = params->data[i];
    const Type *t = info->type;
    int size = 0, align = 0;
    if (t->kind == TY_STRUCT) {
      size = type_size(t);
      align = align_size(t);
    } else {
      if (is_flonum(t)) {
        if (fn >= kArchSetting.max_freg_args)
          size = align = TARGET_POINTER_SIZE;
        ++fn;
      } else {
        if (gn >= kArchSetting.max_reg_args)
          size = align = TARGET_POINTER_SIZE;
        ++gn;
      }
    }
    if (size > 0)
      offset = ALIGN(offset, align) + size;
  }

  FuncBackend *fnbe = curfunc->extra;
  FrameInfo *fi = &fnbe->vaarg_frame_info;
  VReg *p = new_ir_bofs(fi)->dst;
  if (offset > 0) {
    enum VRegSize vsize = to_vsize(&tyVoidPtr);
    p = new_ir_bop(IR_ADD, p, new_const_vreg(offset, vsize), vsize,
                   IRF_UNSIGNED);
  }
  new_ir_mov(varinfo->local.vreg, p, IRF_UNSIGNED);
  return NULL;
}
#elif XCC_TARGET_ARCH == XCC_ARCH_RISCV64
static VReg *gen_builtin_va_start(Expr *expr) {
  assert(expr->kind == EX_FUNCALL);
  Vector *args = expr->funcall.args;
  assert(args->len == 2);
  assert(curfunc != NULL);
  Expr *var = strip_cast(args->data[1]);
  // if (var->kind == EX_REF)
  //   var = var->unary.sub;

  const Vector *params = curfunc->params;
  assert(params != NULL);
  assert(params->len > 0);

  bool is_last = false;
  if (var->kind == EX_VAR) {
    assert(curfunc->type->func.vaargs);
    VarInfo *varinfo = params->data[params->len - 1];
    is_last = equal_name(var->var.name, varinfo->ident->ident);
  }
  if (!is_last) {
    parse_error(PE_NOFATAL, var->token, "Must be last function argument");
    return NULL;
  }

  int gn = 0;
  for (int i = 0; i < params->len; ++i) {
    VarInfo *info = params->data[i];
    const Type *t = info->type;
    if (t->kind != TY_STRUCT) {
      if (!is_flonum(t))
        ++gn;
    }
  }

  const int MAX_REG_ARGS = kArchSetting.max_reg_args;
  const int MAX_FREG_ARGS = kArchSetting.max_freg_args;
  int offset = 0;
  if (gn >= MAX_REG_ARGS) {
    offset = (gn - MAX_REG_ARGS) * TARGET_POINTER_SIZE;
  } else {
    // Check whether register arguments saved on stack has padding.
    RegParamInfo iparams[8];
    RegParamInfo fparams[8];
    assert(MAX_REG_ARGS <= (int)ARRAY_SIZE(iparams));
    assert(MAX_FREG_ARGS <= (int)ARRAY_SIZE(fparams));
    int iparam_count = 0;
    int fparam_count = 0;
    enumerate_register_params(curfunc, iparams, MAX_REG_ARGS, fparams, MAX_FREG_ARGS,
                              &iparam_count, &fparam_count);

    int n = MAX_REG_ARGS - iparam_count;
    if (n > 0) {
      int size_org = n * TARGET_POINTER_SIZE;
      int size = ALIGN(n, 2) * TARGET_POINTER_SIZE;
      offset = size - size_org;
    }
  }

  FuncBackend *fnbe = curfunc->extra;
  FrameInfo *fi = &fnbe->vaarg_frame_info;
  VReg *p = new_ir_bofs(fi)->dst;
  if (offset > 0) {
    enum VRegSize vsize = to_vsize(&tyVoidPtr);
    p = new_ir_bop(IR_ADD, p, new_const_vreg(offset, vsize), vsize, IRF_UNSIGNED);
  }

  // (void)(ap = fp + <vaarg saved offset>)
  VReg *ap = gen_expr(args->data[0]);
  new_ir_mov(ap, p, IRF_UNSIGNED);
  return NULL;
}
#else
static VReg *gen_builtin_va_start(Expr *expr) {
  assert(expr->kind == EX_FUNCALL);
  Vector *args = expr->funcall.args;
  assert(args->len == 2);
  assert(curfunc != NULL);
  Expr *var = strip_cast(args->data[1]);
  if (var->kind == EX_REF)
    var = var->unary.sub;

  const Vector *params = curfunc->params;
  assert(params != NULL);
  assert(params->len > 0);

  bool is_last = false;
  if (var->kind == EX_VAR) {
    assert(curfunc->type->func.vaargs);
    VarInfo *varinfo = params->data[params->len - 1];
    is_last = equal_name(var->var.name, varinfo->ident->ident);
  }
  if (!is_last) {
    parse_error(PE_NOFATAL, var->token, "Must be last function argument");
    return NULL;
  }

  int gn = 0, fn = 0;
  size_t mem_offset = 0;
  for (int i = 0; i < params->len; ++i) {
    VarInfo *info = params->data[i];
    const Type *t = info->type;
    if (is_stack_param(t)) {
      mem_offset += ALIGN(type_size(t), 8);
    } else {
      if (is_flonum(t))
        ++fn;
      else
        ++gn;
    }
  }

  // ap->gp_offset = gn * TARGET_POINTER_SIZE
  const int MAX_REG_ARGS = kArchSetting.max_reg_args;
  const int MAX_FREG_ARGS = kArchSetting.max_freg_args;
  VReg *ap = gen_expr(args->data[0]);
  VReg *gp_offset = ap;
  new_ir_store(gp_offset,
               new_const_vreg(MIN(gn, MAX_REG_ARGS) * TARGET_POINTER_SIZE, to_vsize(&tyInt)), 0);

  // ap->fp_offset = (MAX_REG_ARGS + fn) * TARGET_POINTER_SIZE
  VReg *fp_offset = new_ir_bop(IR_ADD, ap, new_const_vreg(type_size(&tyInt), to_vsize(&tySize)),
                               ap->vsize, IRF_UNSIGNED);
  new_ir_store(fp_offset,
               new_const_vreg((MAX_REG_ARGS + MIN(fn, MAX_FREG_ARGS)) * TARGET_POINTER_SIZE,
                              to_vsize(&tySize)),
               0);

  // ap->overflow_arg_area = 2 * TARGET_POINTER_SIZE
  {
    enum VRegSize vsize = to_vsize(&tyVoidPtr);
    VReg *overflow_arg_area = new_ir_bop(
        IR_ADD, ap, new_const_vreg(type_size(&tyInt) + type_size(&tyInt), vsize), vsize,
        IRF_UNSIGNED);
    FuncBackend *fnbe = curfunc->extra;
    FrameInfo *fi = &fnbe->vaarg_frame_info;
    VReg *p = new_ir_bofs(fi)->dst;
    int gs = MAX(gn - MAX_REG_ARGS, 0), fs = MAX(fn - MAX_FREG_ARGS, 0);
    size_t offset = (gs + fs) * TARGET_POINTER_SIZE + mem_offset;
    if (offset > 0) {
      VReg *addend = new_const_vreg(offset, vsize);
      p = new_ir_bop(IR_ADD, p, addend, vsize, IRF_UNSIGNED);
    }
    new_ir_store(overflow_arg_area, p, 0);
  }

  // ap->reg_save_area = -(MAX_REG_ARGS + MAX_FREG_ARGS) * TARGET_POINTER_SIZE
  {
    enum VRegSize vsize = to_vsize(&tyVoidPtr);
    VReg *reg_save_area = new_ir_bop(
        IR_ADD, ap,
        new_const_vreg(type_size(&tyInt) + type_size(&tyInt) + type_size(&tyVoidPtr), vsize),
        vsize, IRF_UNSIGNED);
    FrameInfo *fi = malloc_or_die(sizeof(*fi));
    fi->offset = -(MAX_REG_ARGS + MAX_FREG_ARGS) * TARGET_POINTER_SIZE;
    VReg *p = new_ir_bofs(fi)->dst;
    new_ir_store(reg_save_area, p, 0);
  }
  return NULL;
}
#endif

static VReg *gen_alloca(Expr *expr) {
  const int stack_align = 16;  // TODO
  assert(expr->kind == EX_FUNCALL);
  Vector *args = expr->funcall.args;
  assert(args->len == 1);
  assert(curfunc != NULL);
  Expr *size = args->data[0];
  const Token *token = size->token;
  Expr *aligned_size = new_expr_int_bop(
      EX_BITAND, token,
      new_expr_addsub(EX_ADD, token, make_cast(&tySSize, token, size, false),
                      new_expr_fixlit(&tySSize, token, stack_align - 1)),
      new_expr_fixlit(&tySSize, token, -stack_align));
  VReg *addend = gen_expr(aligned_size);
  VReg *result = add_new_vreg(&tyVoidPtr);
  new_ir_subsp(addend, result);

  // `stack_work_size` is not calculated in gen phase,
  // so prepare vreg for it and fill the value in emit phase.
  FuncBackend *fnbe = curfunc->extra;
  VReg *offset = fnbe->stack_work_size_vreg;
  if (offset == NULL) {
    // offset = new_const_vreg(0, to_vsize(&tySize));
    // Instead of above, create independent constant vreg.
    offset = reg_alloc_spawn_raw(to_vsize(&tySize), VRF_CONST);
    offset->fixnum = 0;
    fnbe->stack_work_size_vreg = offset;
  }
  new_ir_bop_raw(IR_ADD, result, result, offset, IRF_UNSIGNED);
  return result;
}

void install_builtins(void) {
  static BuiltinExprProc p_function_name = &proc_builtin_function_name;
  add_builtin_expr_ident("__FUNCTION__", &p_function_name);
  add_builtin_expr_ident("__func__", &p_function_name);

  static BuiltinExprProc p_type_kind = &proc_builtin_classify_type;
  add_builtin_expr_ident("__builtin_classify_type", &p_type_kind);

#ifndef __NO_FLONUM
  static BuiltinExprProc p_nan = &proc_builtin_nan;
  add_builtin_expr_ident("__builtin_nan", &p_nan);
#endif

  {
#if VAARG_ON_STACK || XCC_TARGET_ARCH == XCC_ARCH_RISCV64
    Type *tyVaList = ptrof(&tyVoidPtr);
#else
    Type *tyVaElem = create_struct_type(NULL, alloc_name("__va_elem", NULL, false), 0);
    Type *tyVaList = ptrof(tyVaElem);
#endif
    static BuiltinFunctionProc p_va_start = &gen_builtin_va_start;
    Type *rettype = &tyVoid;
    Vector *params = new_vector();
    vec_push(params, tyVaList);
    // vec_push(params, &tyVoidPtr);
    Type *type = new_func_type(rettype, params, true);  // To accept any types, pretend the function as variadic.

    add_builtin_function("__builtin_va_start", type, &p_va_start, true);
  }
  {
    static BuiltinFunctionProc p_alloca = &gen_alloca;
    Type *rettype = &tyVoidPtr;
    Vector *params = new_vector();
    vec_push(params, &tySize);
    Type *type = new_func_type(rettype, params, false);

    add_builtin_function("alloca", type, &p_alloca, false);
  }
}
