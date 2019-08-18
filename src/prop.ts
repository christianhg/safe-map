export const prop = <A, B extends keyof A>(b: B) => (a: A) => a[b];
