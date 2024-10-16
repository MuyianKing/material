import { mix } from "@hl/utils"
import { expect, it } from 'vitest'

it(`mix("#ff0000", "#ffffff", 0)`, () => {
  expect(mix("#ff0000", "#ffffff", 0)).toBe('#ff0000')
})

it(`mix("#ff0000", "#ffffff", 0.5)`, () => {
  expect(mix("#ff0000", "#ffffff", 0.5)).toBe('#ff8080')
})

it(`mix("#ff0000", "#ffffff", 1)`, () => {
  expect(mix("#ff0000", "#ffffff", 1)).toBe('#ffffff')
})
