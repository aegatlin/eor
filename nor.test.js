import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { nor } from './index.js'

describe('nor', () => {
  describe('synchronous', () => {
    it('returns data when ok', () => {
      assert.equal(
        nor(() => 1),
        1
      )
    })

    it('returns null when not ok', () => {
      assert.equal(
        nor(() => {
          throw 'bad'
        }),
        null
      )
    })

    it('handles parametered functions via a higher-order, parameterless function', () => {
      const a = 1
      const b = 2
      const mightThrow = (a, b) => {
        if (b === 2) {
          throw 'bad'
        } else return b
      }
      const actual = nor(() => mightThrow(a, b))
      assert.equal(actual, null)
    })
  })

  describe('asynchronous: function-promise', () => {
    it('returns data when ok', async () => {
      const actual1 = await nor(async () => 1)
      assert.equal(actual1, 1)

      const actual2 = await nor(() => Promise.resolve(1))
      assert.equal(actual2, 1)

      const actual3 = await nor(() => Promise.resolve(1).then((r) => r + 1))
      assert.equal(actual3, 2)
    })

    it('returns null when not ok', async () => {
      const actual1 = await nor(async () => {
        throw 'bad'
      })
      assert.equal(actual1, null)

      const actual2 = await nor(async () =>
        Promise.resolve(1).then((r) => {
          throw 'bad'
        })
      )
      assert.equal(actual2, null)

      const actual3 = await nor(() =>
        Promise.resolve(1).then((r) => {
          throw 'bad'
        })
      )
      assert.equal(actual3, null)
    })
  })

  describe('asynchronous: promise', () => {
    it('returns data when ok', async () => {
      const actual1 = await nor(Promise.resolve(1))
      assert.equal(actual1, 1)

      const actual2 = await nor(Promise.resolve(1).then((r) => r + 1))
      assert.equal(actual2, 2)
    })

    it('return null when not ok', async () => {
      const actual1 = await nor(
        Promise.resolve(1).then((r) => {
          throw 'bad'
        })
      )
      assert.equal(actual1, null)
    })
  })
})
