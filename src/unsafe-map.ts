import toPairs from 'lodash/toPairs';
import values from 'lodash/values';
import { Entries } from './entries';
import { isJust } from './is-just';

export interface UnsafeMap<V> {
  [key: string]: V | undefined;
}

export function unsafeMapToArray<V>(unsafeMap: UnsafeMap<V>): V[] {
  return values(unsafeMap).filter(isJust);
}

export function unsafeMapToEntries<V>(
  unsafeMap: UnsafeMap<V>,
): Entries<string, V> {
  return toPairs(unsafeMap).filter(([_, value]) => isJust(value)) as Entries<
    string,
    V
  >;
}
