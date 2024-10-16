import { expect, it } from 'vitest'
import { arrayUnion } from '@hl/utils'

it('arrayUnion', () => {
  expect(arrayUnion([1, 2, 3, 3])).toStrictEqual([1, 2, 3])
})

it('arrayUnion 3 "3"', () => {
  expect(arrayUnion([3, '3'])).toStrictEqual([3, '3'])
})
