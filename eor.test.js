import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { eor } from './index.js'

describe('eor', () => {
  describe('synchronous', () => {
    it('returns data tuple when ok', () => {
      const actual = eor(() => 1)
      assert.deepEqual(actual, [null, 1])
    })

    it('returns error tuple when not ok', () => {
      const actual = eor(() => {
        throw 'bad'
      })
      assert.deepEqual(actual, ['bad', null])
    })
  })

  describe('asynchronous: function-promise', () => {
    it('returns data tuple when ok', async () => {
      const actual1 = await eor(async () => 1)
      assert.deepEqual(actual1, [null, 1])

      const actual2 = await eor(async () =>
        Promise.resolve(1).then((r) => r + 1)
      )
      assert.deepEqual(actual2, [null, 2])

      const actual3 = await eor(() => Promise.resolve(1).then((r) => r + 1))
      assert.deepEqual(actual3, [null, 2])

      const actual4 = await eor(() => Promise.resolve(1))
      assert.deepEqual(actual4, [null, 1])

      const actual5 = await eor(() => Promise.resolve(1))
      assert.deepEqual(actual5, [null, 1])
    })

    it('return error tuple when not ok', async () => {
      const actual = await eor(async () =>
        Promise.resolve(1).then((r) => {
          throw 'bad'
        })
      )
      assert.deepEqual(actual, ['bad', null])

      const actual2 = await eor(Promise.reject('bad'))
      assert.deepEqual(actual2, ['bad', null])
    })
  })

  describe('asynchronous: promise', () => {
    it('returns data tuple when ok', async () => {
      const actual1 = await eor(Promise.resolve(1))
      assert.deepEqual(actual1, [null, 1])

      const actual2 = await eor(Promise.resolve(1).then((r) => r + 1))
      assert.deepEqual(actual2, [null, 2])
    })

    it('returns error tuple when no ok', async () => {
      const actual = await eor(
        Promise.resolve(1).then((r) => {
          throw 'bad'
        })
      )
      assert.deepEqual(actual, ['bad', null])
    })
  })
})
