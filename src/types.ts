export type Predicate<A> = (a: A) => boolean;

export type Transformer<A, B> = (a: A) => B;
