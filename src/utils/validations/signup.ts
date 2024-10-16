import { emptyField, helperTextHandler, textField } from './common'

interface DataWithPassword {
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
  return textField(2, 15)(value)
}

export const confirmPassword = (password: string, data: DataWithPassword) => {
  return emptyField(
    password,
    'common.errorMessages.emptyField',
    password !== data.password ? 'common.errorMessages.passwordsDontMatch' : ''
  )
}
