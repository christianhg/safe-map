import fromPairs from 'lodash/fromPairs';
import { UnsafeMap } from './unsafe-map';

export type Entry<K, V> = [K, V];

export type Entries<K, V> = Entry<K, V>[];

export function createEntry<K, V>(key: K, value: V): Entry<K, V> {
  return [key, value];
}

export function entriesToUnsafeMap<K extends string, V>(
  entries: Entries<K, V>,
): UnsafeMap<V> {
  return fromPairs(entries);
}
