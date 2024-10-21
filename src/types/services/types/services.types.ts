import { AxiosResponse } from 'axios'

import { Sort } from '~/types'

export interface RequestParams {
  limit: number
  skip: number
  sort: Sort
  categories: string[]
}

export interface ErrorResponse {
  code: string
  message: string
  status: number
}

export type ServiceFunction<Response, Params = undefined> = (
  params?: Params
) => Promise<AxiosResponse<Response>>
