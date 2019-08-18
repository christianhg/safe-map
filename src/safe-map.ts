import { fromNullable, Maybe } from 'kanskje';
import { createEntry, Entries, entriesToUnsafeMap, Entry } from './entries';
import { safeFind } from './safe-find';
import { Predicate, Transformer } from './types';
import { UnsafeMap, unsafeMapToArray, unsafeMapToEntries } from './unsafe-map';

/**
 * A safe and immutable alternative to `Map` which incorporates with `Maybe`.
 * Inspired by http://facebook.github.io/immutable-js/docs/#/Map
 **/
export class SafeMap<A> {
  private readonly unsafeMap: UnsafeMap<A>;

  /**
   * Constructs a new `SafeMap` from `array`.
   * The getKey function should return a proper key for the entry.
   */
  public static fromArray<A>(getKey: (a: A) => string, array: A[]): SafeMap<A> {
    const entries = array.map(entry => createEntry(getKey(entry), entry));

    return SafeMap.of(entries);
  }

  /**
   * Constructs a new `SafeMap` from `entries`.
   */
  public static of<A>(entries: Entries<string, A>): SafeMap<A> {
    return new SafeMap(entries);
  }

  constructor(entries: Entries<string, A>) {
    this.unsafeMap = entriesToUnsafeMap(entries);
  }

  /**
   * Returns a new `SafeMap` with the `entries` concatenated with this one.
   */
  public concat<B extends A>(entries: Entries<string, B>): SafeMap<A> {
    return SafeMap.of([...unsafeMapToEntries(this.unsafeMap), ...entries]);
  }

  /**
   * Returns a new `SafeMap` which excludes `key`.
   */
  public delete(key: string): SafeMap<A> {
    return SafeMap.of(
      unsafeMapToEntries(this.unsafeMap).filter(([keyB]) => key !== keyB),
    );
  }

  /**
   * Returns a new `SafeMap` which only includes the `keys`. The entries are
   * ordered by the order of the `keys`.
   */
  public filterKeys(keys: string[]): SafeMap<A> {
    const filteredEntries = unsafeMapToEntries(this.unsafeMap).filter(([key]) =>
      keys.some(keyB => key === keyB),
    );

    return SafeMap.of(filteredEntries);
  }

  /**
   * Returns the first value for which the `predicate` returns true.
   */
  public find(predicate: Predicate<A>): Maybe<A> {
    return safeFind(unsafeMapToArray(this.unsafeMap), predicate);
  }

  /**
   * Returns the value of a `key` safely wrapped in a `Maybe`.
   */
  public get(key: string): Maybe<A> {
    return fromNullable(this.unsafeMap[key]);
  }

  /**
   * Returns true if the `key` exists in the `SafeMap`.
   */
  public has(key: string): boolean {
    return this.unsafeMap[key] !== undefined;
  }

  /**
   * Returns a new `SafeMap` where each value is passed through a `transformer`.
   */
  public map<B>(transformer: Transformer<A, B>): SafeMap<B> {
    const mappedEntries = unsafeMapToEntries(this.unsafeMap).map(
      ([key, value]) => createEntry(key, transformer(value)),
    );

    return SafeMap.of(mappedEntries);
  }

  /**
   * Returns a new `SafeMap` which includes `entry`.
   */
  public set(entry: Entry<string, A>): SafeMap<A> {
    return SafeMap.of([...unsafeMapToEntries(this.unsafeMap), entry]);
  }

  /**
   * Returns the number of entries that the `SafeMap` contains.
   */
  public get size(): number {
    return Object.keys(this.unsafeMap).length;
  }

  /**
   * Converts the `SafeMap` to an array containing the values.
   */
  public toArray(): A[] {
    return unsafeMapToArray(this.unsafeMap);
  }

  /**
   * Converts the `SafeMap` to a `Entries`.
   */
  public toEntries(): Entries<string, A> {
    return unsafeMapToEntries(this.unsafeMap);
  }

  /**
   * Converts the `SafeMap` to a `UnsafeMap`.
   */
  public toUnsafeMap(): UnsafeMap<A> {
    return {
      ...this.unsafeMap,
    };
  }
}
