import { emptyField, textField } from '~/utils/validations/common'

export const initialValues = {
  reqSubject: '',
  reqInfo: ''
}

export const validations = {
  reqSubject: (value) =>
    emptyField(
      value,
      'common.errorMessages.emptyField',
      textField(2, 35)(value)
    ),
  reqInfo: (value) =>
    emptyField(
      value,
      'common.errorMessages.emptyField',
      textField(10, 35)(value)
    )
}
