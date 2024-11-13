import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { ItemsWithCount, SubjectInterface, SubjectNameInterface } from '~/types'

export const subjectService = {
  getSubjectsWithParamsAndCategoryId: (
    params?: Pick<SubjectInterface, 'name'>,
    categoryId?: string
  ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
    const queryParams = { ...params, category: categoryId }
    return axiosClient.get(URLs.subjects.get, { params: queryParams })
  },
  getSubjects: (
    params?: Partial<SubjectInterface>
  ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
    return axiosClient.get(URLs.subjects.get, { params })
  },
  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    return axiosClient.get(`${URLs.subjects.getNames}?category=${categoryId}`)
  }
}
