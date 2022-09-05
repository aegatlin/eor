# eor

Eor is a strongly-typed try-catch wrapper library that makes `try`ing and `catch`ing easier to work with. It comes with two functions, `eor`, and `nor`.

```sh
npm install eor
```

```js
import { eor } from 'eor'

let [err, num] = eor(() => 1) // => [null, 1]
let [err, num] = eor(() => {
  throw 'bad'
}) // => ['bad', null]
```

```js
import { nor } from 'eor'

let num = nor(() => 1) // => 1
let num = nor(() => {
  throw 'bad'
}) // => null
```

## Explanation

Try-catch code is noisy and hard to work with. This is a recipe for bugs. Simplifying the interface will lead to that is easier to read and reason about. With `nor` you get the simplest experience: you either get the return value, or you get `null`.

```js
const x = nor(() => 1) // => 1
const y = nor(() => {
  throw 'bad'
}) // => null
```

With `eor` you get more to work with, in that the return value is wrapped in an error-data tuple, which lets you use the error value in your control-flow.

```js
import { eor } from 'eor'

let [err, num] = eor(() => 1) // => [null, 1]
let [err, num] = eor(() => {
  throw 'bad'
}) // => ['bad', null]
```

## Tutorials

### Query Params to Database Query

Let's say you are passing query params to a database query (safely!). You don't know ahead of time whether the `id` provided in the query param exists. Your database library throws when it fails to find the row. Also, all of this is asynchronous.

First, install eor `npm i eor`. Then wrap your database call in `eor`. `queryParamId` might be undefined, or it might be defined and not exist, both of which will cause our database library to throw.

```js
import { eor } from 'eor'
import { db } from 'db-library'

// assume the db-library throws the following strings when it throws.
function get(queryParamId) {
  const [e, data] = await eor(() => db.get(queryParamId))
  if (e === 'id is undefined') {
    return 500
  } else if (e === 'id does not exist') {
    return 400
  }

  return data
}
```

Alternatively, with `nor` you can simply try to get the data, and bail on failure.

```js
import { nor } from 'eor'
import { db } from 'db-library'

function get(queryParamId) {
  const data = await nor(() => db.get(queryParamId))
  return data ? data : 404
}
```

### Delicate Calculator

Let's say you are working with a library that performs a delicate and complicated calculation. You want to take user input and try to perform the calculation.

First, install eor `npm i eor`. Then, wrap the calculation in `eor`. If it is successful we will return the results, otherwise we will log the error as a warning and return the error value in case a function upstream wants to work with it.

```js
import { eor } from 'eor'
import { calculator } from 'delicate-complicated-library'

function safeCalculator(userInput1, userInput2) {
  const [e, results] = eor(() => calculator(userInput1, userInput2))
  if (results) return results
  console.warn(e)
  return e
}
```

If we didn't care about the errors coming from the library itself, we could instead use `nor`.

```js
import { nor } from 'eor'
import { calculator } from 'delicate-complicated-library'

function safeCalculator(userInput1, userInput2) {
  const results = nor(() => calculator(userInput1, userInput2))
  if (results) return results
  console.warn('calculation failed!')
}
```

## How-To Guides

### Work with Error-Data Tuples

```js
function mightThrow() {
  // code which might throw...
}

function bad(e) {
  // what to do when `mightThrow` throws...
}

function good(data) {
  // what to do when `mightThrow` returns data...
}

function f() {
  const [e, data] = eor(mightThrow)
  if (e) return bad(e)
  return good(data)
}
```

### Working with functions with parameters

You can call functions with parameters by wrapping it in a higher-order function with **no** parameters.

```js
const a = 1
const b = 2
const multiParameterFunction = (a, b) => a + b
const x = nor(() => multiParameterFunction(a, b))
// x === 3
```

## Reference

### eor

`eor` stands for "Error OR". It has one parameter, either a function with **no** parameters, or a Promise. In all cases it will `try` to return the results. If it succeeds, for return type `R`, it returns `[null, R]`. If it fails, it returns `[any, null]`, where `any` is the returned error value.

#### Synchronous Functions

```js
const [e, num] = eor(() => 1) // => [null, 1]
```

```js
const [e, num] = eor(() => {
  throw 'bad'
}) // => ['bad', null]
```

#### Asynchronous Functions

```js
async function fetchData {
  // async stuff...
  return 1
}
const [e, num] = await eor(fetchData) // => [null, 1]
```

```js
async function fetchData {
  throw 'bad'
}
const [e, num] = await eor(fetchData) // => ['bad', null]
```

#### Promise

```js
const p = Promise.resolve(1)
const [e, num] = await eor(p) // => [null, 1]
```

```js
const p = Promise.reject('bad')
const [e, num] = await eor(p) // => ['bad', 1]
```

### nor

`nor` stands for "Null OR". It has one parameter, either a function with **no** parameters, or a Promise. In all cases it will `try` to return the results. If it succeeds, for return type `R`, it returns `R`. If it fails, it returns `null`.

#### Synchronous Functions

```js
const num = nor(() => 1) // => 1
```

```js
const num = nor(() => {
  throw 'bad'
}) // => null
```

#### Asynchronous Functions

```js
async function fetchData {
  // async stuff...
  return 1
}
const num = await nor(fetchData) // => 1
```

```js
async function fetchData {
  throw 'bad'
}
const num = await nor(fetchData) // => null
```

#### Promise

```js
const p = Promise.resolve(1)
const num = await nor(p) // => 1
```

```js
const p = Promise.reject('bad')
const num = await nor(p) // => null
```
