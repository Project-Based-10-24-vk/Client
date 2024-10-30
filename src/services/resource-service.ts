import { AxiosResponse } from 'axios'

import { appApi } from '~/redux/apiSlice'
import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import {
  ApiMethodEnum,
  Categories,
  CategoryNameInterface,
  CreateCategoriesParams,
  CreateLessonData,
  CreateQuestionData,
  GetLessonsParams,
  GetQuestion,
  GetResourcesCategoriesParams,
  GetResourcesParams,
  ItemsWithCount,
  Lessons,
  Question,
  UpdateLessonParams,
  UpdateQuestionParams,
  UpdateResourceCategory
} from '~/types'

export const ResourceService = {
  getLessons: async (
    params?: GetLessonsParams
  ): Promise<AxiosResponse<ItemsWithCount<Lessons>>> => {
    return await axiosClient.get(createUrlPath(URLs.resources.lessons.get), {
      params
    })
  },
  getLesson: async (id?: string): Promise<AxiosResponse<Lessons>> =>
    await axiosClient.get(createUrlPath(URLs.resources.lessons.get, id)),
  createLesson: async (data?: CreateLessonData): Promise<AxiosResponse> => {
    return await axiosClient.post(URLs.resources.lessons.post, data)
  },
  updateLesson: async (params?: UpdateLessonParams) =>
    await axiosClient.patch(
      createUrlPath(URLs.resources.lessons.patch, params?.id),
      params
    ),
  deleteLesson: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(createUrlPath(URLs.resources.lessons.delete, id)),
  getQuestions: (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Question>>> => {
    return axiosClient.get(URLs.resources.questions.get, { params })
  },
  getQuestion: async (id?: string): Promise<AxiosResponse<GetQuestion>> =>
    await axiosClient.get(createUrlPath(URLs.resources.questions.get, id)),
  createQuestion: async (data?: CreateQuestionData): Promise<AxiosResponse> => {
    return await axiosClient.post(URLs.resources.questions.post, data)
  },
  updateQuestion: async (params?: UpdateQuestionParams) =>
    await axiosClient.patch(
      createUrlPath(URLs.resources.questions.patch, params?.id),
      params
    ),
  deleteQuestion: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.questions.delete, id)
    ),
  getResourcesCategories: (
    params?: GetResourcesCategoriesParams
  ): Promise<AxiosResponse<ItemsWithCount<Categories>>> => {
    return axiosClient.get(URLs.resources.resourcesCategories.get, { params })
  },
  getResourcesCategoriesNames: (): Promise<
    AxiosResponse<CategoryNameInterface[]>
  > => axiosClient.get(URLs.resources.resourcesCategories.getNames),
  createResourceCategory: async (
    params?: CreateCategoriesParams
  ): Promise<AxiosResponse<Categories>> =>
    await axiosClient.post(URLs.resources.resourcesCategories.post, params),
  deleteResourceCategory: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.resourcesCategories.delete, id)
    )
}

export const resourceService = appApi.injectEndpoints({
  endpoints: (build) => ({
    updateResourceCategory: build.mutation<void, UpdateResourceCategory>({
      query: (params) => ({
        url: createUrlPath(URLs.resources.resourcesCategories.patch, params.id),
        method: ApiMethodEnum.PATCH,
        body: { ...params }
      })
    })
  })
})

export const { useUpdateResourceCategoryMutation } = resourceService
