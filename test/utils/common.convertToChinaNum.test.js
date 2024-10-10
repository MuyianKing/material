import { expect, it } from 'vitest'
import { convertToChinaNum } from '@hl/utils'

it('11 is 十一', () => {
  expect(convertToChinaNum(11)).toBe('十一')
})

it('111 is 一百一十', () => {
  expect(convertToChinaNum(110)).toBe('一百一十')
})
