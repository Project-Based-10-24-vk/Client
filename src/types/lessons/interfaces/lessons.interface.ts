import { Category, CommonEntityFields } from '~/types'

export interface Lessons extends CommonEntityFields {
  title: string
  category: Category | null
  description: string
}
