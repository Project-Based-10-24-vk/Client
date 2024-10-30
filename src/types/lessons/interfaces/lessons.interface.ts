import type {
  CommonEntityFields,
  ResourceType
} from '~/types/common/common.index'

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
  category: string | null
  attachments: Attachment[]
}
