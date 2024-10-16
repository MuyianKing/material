import { someInArray } from '@hl/utils'
import { expect, it } from 'vitest'

it('someInArray([1, 2], [2, 3, 4])', () => {
  expect(someInArray([1, 2], [2, 3, 4])).toBe(true)
})

it('someInArray([1], [2, 3, 4])', () => {
  expect(someInArray([1], [2, 3, 4])).toBe(false)
})
