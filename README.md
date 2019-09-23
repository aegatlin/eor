# eor

Eor exports two utilities, `eorp` and `eorf`, each of which return `[error, data]` tuples, hence the name "e or ?". `eorp` is a try-catch wrapper around promises. `eorf` is a try-catch wrapper around (synchronous) functions.

## Install

```bash
npm install eor
```

```bash
yarn add eor
```

## Usage

```typescript
import { eorp, eorf } from 'eor'
```

### eorp

```typescript
const [err, data] = await eorp(myPromise())
if (err) return
return data
```

```typescript
const [err] = await eorp(myPromise())
if (err) return
doSomething()
```

### eorf

```typescript
const [err, data] = eorf(myFunction, inputOne, inputTwo)
if (err) return
return data
```

```typescript
const [err] = eorf(myFunction, inputOne, inputTwo)
if (err) return
doSomething()
```
