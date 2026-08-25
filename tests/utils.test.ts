import { describe, expect, it, vi } from 'vitest'
import { HighlightTextConverter, jwtExpirationDateConverter, pxToRem, toBRL } from '../src/utils'

describe('utils', () => {
  it.each([
    ['alert', '* Meta longe de ser batida'],
    ['success', '* A meta do mês foi batida! Parabéns!'],
    ['warning', '* Falta pouco, vamos lá!'],
    ['unknown', '* Sem dados no momento ...'],
  ])('converts highlight status %s', (status, expected) => {
    expect(HighlightTextConverter(status)).toBe(expected)
  })

  it('converts pixels to rem', () => {
    expect(pxToRem(24)).toBe('1.5rem')
  })

  it('formats values as Brazilian currency', () => {
    expect(toBRL(1234.5)).toBe('R$\u00a01.234,50')
  })

  it('calculates days until JWT expiration', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000)
    expect(jwtExpirationDateConverter(1_700_172_800)).toBe(2)
    vi.restoreAllMocks()
  })
})