import { empty } from 'kanskje';
import { prop } from '../src/prop';
import { SafeMap } from '../src/safe-map';

describe('SafeMap', () => {
  type Person = {
    id: string;
    name: string;
    age: number;
  };

  const alice = { id: 'alice', name: 'Alice', age: 42 };
  const bob = { id: 'bob', name: 'Bob', age: 12 };
  const mallory = { id: 'bob', name: 'Bob', age: 50 };

  const people = SafeMap.of<Person>([['alice', alice], ['bob', bob]]);

  const noOne = empty<Person>();

  const agePerson = (person: Person) => ({
    ...person,
    age: person.age + 1,
  });

  it('guards against nullables', () => {
    expect(people.get('mallory')).toEqual(noOne);
    expect(people.find(({ age }) => age >= 50)).toEqual(noOne);
  });

  it('is isomorphic with arrays', () => {
    expect(people.toArray()).toEqual([alice, bob]);
    expect(SafeMap.fromArray(prop('id'), [alice, bob])).toEqual(people);
  });

  it('is isomorphic with entries', () => {
    expect(people.toEntries()).toEqual([['alice', alice], ['bob', bob]]);
    expect(SafeMap.of([['alice', alice], ['bob', bob]])).toEqual(people);
  });

  it('converts to a UnsafeMap', () => {
    expect(people.toUnsafeMap()).toEqual({
      alice,
      bob,
    });
  });

  it('is immutable', () => {
    people.delete('alice');

    expect(people.has('alice')).toBeTruthy();

    people.set(['mallory', mallory]);

    expect(people.has('mallory')).toBeFalsy();
  });

  it('is mappable', () => {
    const agedPeople = people.map(agePerson);

    expect(agedPeople.toArray()).toEqual([agePerson(alice), agePerson(bob)]);
  });

  it('has a size', () => {
    expect(SafeMap.of([]).size).toBe(0);
    expect(people.size).toBe(2);
  });

  it('is concatable', () => {
    expect(people.concat([['mallory', mallory]])).toEqual(
      SafeMap.of([['alice', alice], ['bob', bob], ['mallory', mallory]]),
    );

    expect(people.concat([['bob', agePerson(bob)]])).toEqual(
      SafeMap.of([['alice', alice], ['bob', agePerson(bob)]]),
    );
  });

  it('can be filtered by keys', () => {
    expect(people.filterKeys(['mallory'])).toEqual(SafeMap.of([]));
    expect(people.filterKeys(['bob'])).toEqual(SafeMap.of([['bob', bob]]));
  });
});
