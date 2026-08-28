import { renderHook, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useFormValidation } from '../src/hooks/useFormValidation'

describe('useFormValidation', () => {
  it('requires required fields and accepts their values', () => {
    const { result } = renderHook(() =>
      useFormValidation([
        { type: 'text', required: true },
        { type: 'tel', required: true },
      ])
    )

    expect(result.current.formValid).toBe(false)
    act(() => result.current.handleChange(0, 'Ana'))
    expect(result.current.formValid).toBe(false)
    act(() => result.current.handleChange(1, '11999999999'))
    expect(result.current.formValid).toBe(true)
  })

  it('validates email content', () => {
    const { result } = renderHook(() =>
      useFormValidation([{ type: 'email' }])
    )

    act(() => result.current.handleChange(0, 'invalid-email'))
    expect(result.current.formValid).toBe(false)
    act(() => result.current.handleChange(0, 'ana@example.com'))
    expect(result.current.formValid).toBe(true)
  })

  it('enforces the password policy', () => {
    const { result } = renderHook(() =>
      useFormValidation([{ type: 'password' }])
    )

    act(() => result.current.handleChange(0, 'weak'))
    expect(result.current.formValid).toBe(false)
    act(() => result.current.handleChange(0, 'Strong@123'))
    expect(result.current.formValid).toBe(true)
  })
})