import { getLabelByVal } from '@hl/utils'
import { expect, it } from 'vitest'

const array = [
  {
    label: '测试1',
    value: 'test1',
  },
  {
    label: '测试2',
    value: 'test2',
  },
]

it(`getLabelByVal`, () => {
  expect(getLabelByVal(array, 'test2')).toBe('测试2')
})

it(`getLabelByVal obj`, () => {
  expect(getLabelByVal(array, 'test2', {
    obj: true,
  })).toStrictEqual({
    label: '测试2',
    value: 'test2',
  })
})

const array2 = [
  {
    id: 1,
    name: 'name1',
  },
  {
    id: 2,
    name: 'name2',
  },
]

it(`getLabelByVal label value`, () => {
  expect(getLabelByVal(array2, 2, {
    label: 'name',
    value: 'id',
  })).toBe('name2')
})

it(`getLabelByVal label value obj`, () => {
  expect(getLabelByVal(array2, 2, {
    label: 'name',
    value: 'id',
    obj: true,
  })).toStrictEqual({
    id: 2,
    name: 'name2',
  })
})
