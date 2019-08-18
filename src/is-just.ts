import { Nullable } from 'kanskje';

export function isJust<A>(nullable: Nullable<A>): nullable is A {
  return nullable !== undefined && nullable !== null;
}
