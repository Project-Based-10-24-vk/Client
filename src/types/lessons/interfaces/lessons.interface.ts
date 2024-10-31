import {
  Category,
  CategoryNameInterface,
  CommonEntityFields,
  RequestParams
} from '~/types'

export interface Lessons extends CommonEntityFields {
  title: string
  description: string
  content: string
  author: string
  category: Category['_id'] | null
}

export interface CreateLessonData {
  title: string
  description: string
  content: string
}

export interface UpdateLessonParams {
  title: Lessons['title']
  id: Lessons['_id']
  description: Lessons['description']
  category: CategoryNameInterface | string | null
}

export interface GetLessonsParams extends Partial<RequestParams> {
  title?: string
}
