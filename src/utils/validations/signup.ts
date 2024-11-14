import { emptyField, helperTextHandler, nameField, textField } from './common'

export interface DataWithPassword {
  password: string
  [key: string]: string
}

export const email = (value: string) => {
  return helperTextHandler(value, 'email')
}

export const password = (value: string) => {
  return helperTextHandler(value, 'password')
}

export const names = (value: string) => {
  if (value.length === 0) {
    return nameField(value)
  } else {
    return textField(2, 15)(value)
  }
}

export const firstName = (value: string) => {
  return names(value.trim())
}

export const lastName = (value: string) => {
  return names(value.trim())
}

export const confirmPassword = (password: string, data: DataWithPassword) => {
  return emptyField(
    password,
    'common.errorMessages.emptyField',
    password !== data.password ? 'common.errorMessages.passwordsDontMatch' : ''
  )
}
