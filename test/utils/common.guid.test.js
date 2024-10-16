import { expect, it } from 'vitest'
import { guid } from '@hl/utils'

expect.extend({
  toLength: (received, expected) => {
    console.log(received)

    if (received.length !== expected) {
      return {
        message: () => `expected:${expected}，received：${received.length} `,
        pass: false,
      }
    }

    return {
      pass: true,
    }
  },
})

it('guid()', () => {
  expect(guid()).toBeTypeOf('string').toLength(16)
})

it('guid(8)', () => {
  expect(guid(8)).toBeTypeOf('string').toLength(8)
})
