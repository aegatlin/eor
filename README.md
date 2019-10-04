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
