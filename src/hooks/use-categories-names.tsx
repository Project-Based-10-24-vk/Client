import { useCallback } from 'react'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { defaultResponses } from '~/constants'
import { CategoryNameInterface } from '~/types'

interface UseCategoriesNamesProps<T> {
  fetchOnMount?: boolean
  transform?: (data: CategoryNameInterface[]) => T[]
}

const useCategoriesNames = <T = CategoryNameInterface,>({
  fetchOnMount = true,
  transform
}: UseCategoriesNamesProps<T> = {}) => {
  const getCategoriesNames = useCallback(
    () => categoryService.getCategoriesNames(),
    []
  )

  const { loading, response, fetchData, error } = useAxios<
    CategoryNameInterface[],
    undefined,
    T[]
  >({
    service: getCategoriesNames,
    fetchOnMount,
    defaultResponse: defaultResponses.array,
    transform
  })

  return { loading, response, fetchData, error }
}

export default useCategoriesNames
