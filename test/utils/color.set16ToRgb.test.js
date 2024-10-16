import { expect, it } from 'vitest'
import { set16ToRgb } from '@hl/utils'

function testFun(color, result) {
  return set16ToRgb(color).filter((item, index) => {
    return item === result[index]
  }).length === 3
}

it('set16ToRgb is [255, 0, 0]', () => {
  expect(testFun('#ff0000', [255, 0, 0])).toBe(true)
})
