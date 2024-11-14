import {
  Category,
  CategoryNameInterface,
  CommonEntityFields,
  RequestParams,
  ResourceType
} from '~/types'

export interface Lessons extends CommonEntityFields {
  title: string
  description: string
  content: string
  author: string
  category: Category | null
  resourceType: ResourceType
  attachments: Attachment[]
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
  name?: string
  category?: string[]
}

export interface Attachment extends CommonEntityFields {
  name: string
  size: number
  url: string
  extension: string
}

export interface Lesson extends CommonEntityFields {
  title: string
  description: string
  content: string
  author: string
  category: { _id: string; name: string } | null
  resourceType: string
  attachments: Attachment[]
}

export interface LessonData {
  id?: string
  title: string
  description: string
  content: string
  category: { _id: string; name: string } | null
  attachments: Attachment[]
  resourceType: string
}

export interface GetLessonsParams extends Partial<RequestParams> {
  title?: string
}
