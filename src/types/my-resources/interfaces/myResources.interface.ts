import { CommonEntityFields, RequestParams } from '~/types'

export interface Categories extends CommonEntityFields {
  name: string
  author: string
}

export interface Lessons extends CommonEntityFields {
  title: string
  category: Categories | null
  author: string
  description: string
}

export interface GetResourcesParams extends Partial<RequestParams> {
  title?: string
  fileName?: string
}

export interface UpdateResourceCategory {
  name: Categories['name']
  id: Categories['_id']
}

export interface GetResourcesCategoriesParams extends Partial<RequestParams> {
  name?: string
}
