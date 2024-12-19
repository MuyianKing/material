import { getCanUseValue } from '@hl/utils'
import { expect, it } from 'vitest'

it('getCanUseValue 12', () => {
  expect(getCanUseValue(12)).toBe('12px')
})

it('getCanUseValue 12px', () => {
  expect(getCanUseValue('12px')).toBe('12px')
})

it('getCanUseValue 100%', () => {
  expect(getCanUseValue('100%')).toBe('100%')
})

it('getCanUseValue 60vh', () => {
  expect(getCanUseValue('60vh')).toBe('60vh')
})

it('getCanUseValue calc(100vh - 100px)', () => {
  expect(getCanUseValue('calc(100vh - 100px)')).toBe('calc(100vh - 100px)')
})
