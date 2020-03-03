export function square(x) {
  return x * x;
}

export function cube(x) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('非生产环境中使用')
  }
  return x * x * x;
}