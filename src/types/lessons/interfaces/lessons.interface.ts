import {
  Category,
  CategoryNameInterface,
  CommonEntityFields,
  RequestParams,
  ResourseTypes,
  Attachment
} from '~/types'

export interface Lesson extends CommonEntityFields {
  title: string
  description: string
  content: string
  author: string
  category: string | null
  resourceType: ResourseTypes
  attachments: Attachment[] // add backend
}

export interface LessonData {
  title: string
  description: string
  content: string
  category?: string | null
  resourceType?: ResourseTypes 
  attachments: Attachment[] // add backend
}


export interface Lessons extends CommonEntityFields {
  title: string
  description: string
  content: string
  author: string
  category: Category['_id'] | null
}

export interface CreateLessonData extends LessonData {}

export interface UpdateLessonData extends LessonData  {}

export interface GetLessonsParams extends Partial<RequestParams> {
  title?: string
}
