import find from 'lodash/find';

import { fromNullable, Maybe } from 'kanskje';

export function safeFind<A>(xs: A[], f: (a: A) => boolean): Maybe<A> {
  return fromNullable(find(xs, f));
}
