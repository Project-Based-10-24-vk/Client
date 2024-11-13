import { emptyField, textField } from '~/utils/validations/common'

export const validations = {
  title: (value: string | null) =>
    emptyField(value, 'lesson.errorMessages.title'),
  description: (value: string) =>
    emptyField(value, 'lesson.errorMessages.description'),
  content: (value: string) => textField(50, 10000)(value)
}

export const initialValues = {
  title: '',
  description: '',
  content: '',
  attachments: [],
  category: null,
  resourceType: 'lessons'
}

export const defaultResponse = {
  attachments: [],
  author: '',
  createdAt: '',
  description: '',
  title: '',
  updatedAt: '',
  _id: '',
  content: '',
  category: null,
  resourceType: 'lessons'
}

export const myResourcesPath = '/my-resources'
