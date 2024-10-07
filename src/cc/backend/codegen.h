// Code generation

#pragma once

#include <stdbool.h>
#include <stddef.h>  // size_t

#include "ir.h"  // enum VRegSize

typedef struct BB BB;
typedef struct Expr Expr;
typedef struct Function Function;
typedef struct RegAlloc RegAlloc;
typedef struct Stmt Stmt;
typedef struct StructInfo StructInfo;
typedef struct Type Type;
typedef struct VReg VReg;
typedef struct VarInfo VarInfo;
typedef struct Vector Vector;

// Public

void gen(Vector *decls);

// Private

VReg *gen_expr(Expr *expr);

void gen_cond_jmp(Expr *cond, BB *tbb, BB *fbb);

void set_curbb(BB *bb);
VReg *add_new_vreg(const Type *type);
enum VRegSize to_vsize(const Type *type);
int to_vflag(const Type *type);

bool is_stack_param(const Type *type);

void gen_stmt(struct Stmt *stmt);
VReg *gen_stmts(Vector *stmts);
VReg *gen_block(Stmt *stmt);

typedef VReg *(*BuiltinFunctionProc)(Expr *expr);
void add_builtin_function(const char *str, Type *type, BuiltinFunctionProc *proc,
                          bool add_to_scope);

void gen_clear_local_var(const VarInfo *varinfo);
void gen_memcpy(const Type *type, VReg *dst, VReg *src);

typedef struct {
  const Type *type;
  VReg *vreg;
  int index;
} RegParamInfo;

void enumerate_register_params(
    Function *func, RegParamInfo iargs[], int max_ireg, RegParamInfo fargs[], int max_freg,
    int *piarg_count, int *pfarg_count);

bool gen_defun(Function *func);
void prepare_register_allocation(Function *func);
void map_virtual_to_physical_registers(RegAlloc *ra);
void detect_living_registers(RegAlloc *ra, BBContainer *bbcon);
void alloc_stack_variables_onto_stack_frame(Function *func);

int calculate_func_param_bottom(Function *func);

size_t detect_stack_work_size(Function *func);
