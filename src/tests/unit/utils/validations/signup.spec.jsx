import { vi } from 'vitest'

import { emptyField, helperTextHandler } from '~/utils/validations/common'
import * as common from '~/utils/validations/common'
import {
  confirmPassword,
  email,
  names,
  password
} from '~/utils/validations/signup'

vi.spyOn(common, 'emptyField').mockImplementation(
  (value, emptyMsg, mismatchMsg) => mismatchMsg || emptyMsg
)
vi.spyOn(common, 'helperTextHandler').mockImplementation(
  (value, fieldName) => `${fieldName}: ${value}`
)
vi.spyOn(common, 'textField').mockImplementation(() => (value) => {
  if (value.length < 2) return 'common.errorMessages.shortText'
  if (value.length > 15) return 'common.errorMessages.longText'
  return undefined
})

describe('Validation functions', () => {
  describe('email', () => {
    it('should call helperTextHandler with correct arguments', () => {
      const value = 'test@example.com'
      email(value)
      expect(helperTextHandler).toHaveBeenCalledWith(value, 'email')
    })
  })

  describe('password', () => {
    it('should call helperTextHandler with correct arguments', () => {
      const value = 'password123'
      password(value)
      expect(helperTextHandler).toHaveBeenCalledWith(value, 'password')
    })
  })

  describe('names', () => {
    it('should return an error for a name that is too short', () => {
      const result = names('A')
      expect(result).toBe('common.errorMessages.shortText')
    })

    it('should return an error for a name that is too long', () => {
      const result = names('VeryLongNameThatExceedsLimit')
      expect(result).toBe('common.errorMessages.longText')
    })

    it('should return undefined for a valid name', () => {
      const result = names('John')
      expect(result).toBeUndefined()
    })
  })

  describe('confirmPassword', () => {
    it('should call emptyField with correct arguments when passwords do not match', () => {
      confirmPassword('password123', { password: 'otherPassword' })
      expect(emptyField).toHaveBeenCalledWith(
        'password123',
        'common.errorMessages.emptyField',
        'common.errorMessages.passwordsDontMatch'
      )
    })

    it('should call emptyField with an empty string when passwords match', () => {
      confirmPassword('password123', { password: 'password123' })
      expect(emptyField).toHaveBeenCalledWith(
        'password123',
        'common.errorMessages.emptyField',
        ''
      )
    })
  })
})
