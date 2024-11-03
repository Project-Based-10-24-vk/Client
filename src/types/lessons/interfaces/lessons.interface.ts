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

export interface Attachment {
  name: string
  size: number
  url: string
}

export interface Lesson extends CommonEntityFields {
  title: string
  description: string
  content: string
  author: string
  category: string | null
  resourceType: ResourceType
  attachments: Attachment[]
}

export interface LessonData {
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

export interface Attachment {
  name: string
  size: number
  url: string
}

export interface Lesson extends CommonEntityFields {
  title: string
  description: string
  content: string
  author: string
  category: string | null
  resourceType: ResourceType
  attachments: Attachment[]
}

export interface LessonData {
  title: string
  category: Category | null
  description: string
  content: string
  attachments: Attachment[]
}
