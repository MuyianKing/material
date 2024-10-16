import { expect, it } from 'vitest'
import { isLight } from '@hl/utils'

it('#8e8c8c is false', () => {
  expect(isLight('#D32828')).toBe(false)
})

it('#EFDDDD is true', () => {
  expect(isLight('#EFDDDD')).toBe(true)
})
