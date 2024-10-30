import { Category, CommonEntityFields, ResourceType } from '~/types'

export interface Lessons extends CommonEntityFields {
  title: string
  category: Category | null
  description: string
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
