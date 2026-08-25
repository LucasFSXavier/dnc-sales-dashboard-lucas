import { useState } from 'react'
import type { InputProps } from '@/types'

export const useFormValidation = (inputs: InputProps[]) => {
  const [formValues, setFormValues] = useState(
    inputs.map((input) => input.value || '')
  )
  const formValid = inputs.every((input, index) => {
    const value = !formValues[index]
    if (input.required && value) {
      return false
    }
    if (input.type === 'email') {
      return /\S+@\S+\.\S+/.test(String(value))
    }
    if (input.type === 'password') {
      const password = String(value)
      const hasCorrectLength = password.length >= 8 && password.length <=16
      const hasUppercaseLetter = /[A-Z]/.test(password)
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password)
      const hasNumber = /\d/.test(password)
      return hasCorrectLength && hasUppercaseLetter && hasSpecialCharacter && hasNumber
    }
    return true
  })

  const handleChange = (index: number, value: string) => {
    setFormValues((prevValues) => {
      const newValues = [...prevValues]
      newValues[index] = value
      return newValues
    })
  }

  return { formValues, formValid, handleChange }
}
