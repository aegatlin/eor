# eor

Eor is a try-catch wrapper that returns an `[error, data]` tuple, hence the name "e or ?".

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
