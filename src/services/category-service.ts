import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import {
  CategoriesParams,
  CategoryInterface,
  CategoryNameInterface,
  ItemsWithCount
} from '~/types'

export const categoryService = {
  getCategories: (
    params?: Partial<CategoriesParams>
  ): Promise<AxiosResponse<ItemsWithCount<CategoryInterface>>> => {
    const path = createUrlPath(URLs.categories.get, '', params)
    return axiosClient.get(`${path}`)
  },
  getCategoriesNames: async (): Promise<
    AxiosResponse<ItemsWithCount<CategoryNameInterface>>
  > => {
    return axiosClient.get(URLs.categories.getNames)
  }
}
