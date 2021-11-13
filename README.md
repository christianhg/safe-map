# `SafeMap`

> A safe and immutable alternative to [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) which incorporates with [`Maybe`](https://github.com/christianhg/kanskje).
> Inspired by http://facebook.github.io/immutable-js/docs/#/Map

## API

### `SafeMap` methods

#### `of`

Constructs a new `SafeMap` from `entries`.

- **Signature**

  ```ts
  of<A>(entries: Entries<string, A>): SafeMap<A>
  ```

- **Example:**

  ```js
  SafeMap.of([])
  ```
