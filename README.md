# eor

Eor is a try-catch wrapper that returns an `[error, data]` tuple.

Eor, **e**rror **or**..., is written in Typescript and utilizes the language's builtin type-safety and type-inference capabilities. That said, it is compiled to Javascript, so it will work in any Javascript ecosystem.

## Installation

```bash
npm install eor
```

```bash
yarn add eor
```

## Usage

### Import

```typescript
import { eor } from 'eor'
```

### Invocation

```typescript
const [e, data] = await eor(myPromise)
```

```typescript
const [e, data] = eor(myFunction, input1, input2)
```

### Tuple Processing

```typescript
() => {
  const [e, data] = ...
  if (e) return bad(e)
  return good(data)
}
```

```typescript
() => {
  const [e] = ...
  if (e) return bad(e)
  return good()
}
```

#### Edge case with Typescript compiler

I have run into problems where the Typescript compiler cannot infer the type of the result from a guard clause checking against the existence of an error. Let me explain.

```typescript
;async () => {
  const [e, result] = await eor(myPromise())
  if (e) throw e
  return result.something // Type error: result could be null
}
```

My current, less than ideal solution, is to check against the nullability of the result.

```typescript
;async () => {
  const [e, result] = await eor(myPromise())
  if (!result) throw e
  return result.something // No more type error
}
```

I am researching if there is a way to restructure the types such that a check against `e` will imply the non-nullability of `result`. Until then, the above is my recommended approach.
