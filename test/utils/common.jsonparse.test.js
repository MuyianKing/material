import { expect, it } from 'vitest'
import { jsonparse } from '@hl/utils'

const obj = {
  name: 'muyian',
}

it('jsonparse', () => {
  expect(jsonparse(JSON.stringify(obj))).toStrictEqual(obj)
})

it('jsonparse string', () => {
  expect(jsonparse('test')).toStrictEqual({})
})

it('jsonparse string null', () => {
  expect(jsonparse('test', null)).toBeNull()
})
