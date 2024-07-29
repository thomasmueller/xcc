#include "math.h"

#ifndef __NO_FLONUM
#define LOG_2  0.693147180559945

double log2(double x) {
  if (x <= 0)
    return x < 0 ? NAN : -HUGE_VAL;
  if (!isfinite(x))
    return x;

  return log(x) * (1.0 / LOG_2);
}
#endif
