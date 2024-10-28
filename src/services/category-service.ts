import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import {
  CategoriesParams,
  CategoryInterface,
  CategoryNameInterface
} from '~/types'

export const categoryService = {
  getCategories: (
    params?: Partial<CategoriesParams>
  ): Promise<AxiosResponse<CategoryInterface[]>> => {
    return axiosClient.get(URLs.categories.get, { params })
  },
  getCategoriesNames: (): Promise<AxiosResponse<CategoryNameInterface[]>> => {
    return axiosClient.get(URLs.categories.getNames)
  }
}
