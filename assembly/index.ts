export function multiply(a: i32, b: i32): i32 {
  return a * b;
}

export function factorial(n: i32): i32 {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

export function fibonacci(n: i32): i32 {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export function power(base: i32, exponent: i32): i32 {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}
