import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import { ItemsWithCount, SubjectInterface, SubjectNameInterface } from '~/types'

export const subjectService = {
  getSubjects: (
    params?: Pick<SubjectInterface, 'name'>,
    categoryId?: string
  ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(
      `${URLs.subjects.get}${category}${URLs.subjects.get}`,
      { params }
    )
  },
  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.getNames}`)
  }
}
