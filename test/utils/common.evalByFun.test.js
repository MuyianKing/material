import { evalByFun } from '@hl/utils'
import { expect, it } from 'vitest'

it(`evalByFun`, () => {
  expect(evalByFun('i+j', {
    i: 1,
    j: 2,
  })).toBe(3)
})
