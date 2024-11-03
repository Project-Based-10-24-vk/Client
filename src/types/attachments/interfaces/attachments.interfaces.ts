import {
  CommonEntityFields,
} from '~/types'

export interface Attachment extends CommonEntityFields {
  name: string
  size: number
  author: string
  url: string
}
