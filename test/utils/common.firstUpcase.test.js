import { expect, it } from 'vitest'
import { firstUpcase } from '@hl/utils'

it('firstUpcase', () => {
  expect(firstUpcase('helloWorld')).toBe('HelloWorld')
})
