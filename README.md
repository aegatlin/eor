# eor

Eor is a try-catch wrapper that returns an `[error, data]` tuple, hence the name "e or ?".

Eor is written in Typescript and utilizes the language's builtin type-safety and type-inference capabilities. That said, it is compiled to Javascript, so it will work in any Javascript ecosystem.

## Install

```bash
npm install eor
```

```bash
yarn add eor
```

## Usage

```typescript
import { eor } from 'eor'
```

```typescript
const [err, data] = await eor(myPromise)
```

```typescript
const [err, data] = eor(myFunction, inputOne, inputTwo)
```
