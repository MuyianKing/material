import { expect, it } from 'vitest'
import { isTruth } from '@hl/utils'

it('null is false', () => {
  expect(isTruth(null)).toBe(false)
})

it('undefined is false', () => {
  expect(isTruth(undefined)).toBe(false)
})

it('"null" is false', () => {
  expect(isTruth('null')).toBe(false)
})

it('"undefined" is false', () => {
  expect(isTruth('undefined')).toBe(false)
})

it('false is false', () => {
  expect(isTruth(false)).toBe(false)
})

it('"NULL" is false', () => {
  expect(isTruth('NULL')).toBe(false)
})

it('"" is false', () => {
  expect(isTruth('')).toBe(false)
})

it('"false" is false', () => {
  expect(isTruth('false')).toBe(false)
})

it('0 is false', () => {
  expect(isTruth(0)).toBe(false)
})

it('"0" is true', () => {
  expect(isTruth('0')).toBe(true)
})

it('"test" is true', () => {
  expect(isTruth('test')).toBe(true)
})

it('111 is true', () => {
  expect(isTruth(111)).toBe(true)
})
