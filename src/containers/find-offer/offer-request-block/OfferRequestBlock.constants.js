import { emptyField, textField } from '~/utils/validations/common'

export const initialValues = {
  reqSubject: '',
  reqCategory: '',
  reqInfo: ''
}

export const validations = {
  reqSubject: (value) =>
    emptyField(
      value,
      'offerPage.errorMessages.subject',
      textField(2, 35)(value)
    ),
  reqCategory: (value) =>
    emptyField(
      value,
      'offerPage.errorMessages.category',
      textField(2, 35)(value)
    ),
  reqInfo: (value) =>
    emptyField(
      value,
      'offerPage.errorMessages.description',
      textField(10, 35)(value)
    )
}
