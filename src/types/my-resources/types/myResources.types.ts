import { TFunction } from 'i18next'
import { NavigateFunction } from 'react-router-dom'

import { GetResourcesParams, ItemsWithCount } from '~/types'

export type ResourcesTableData<T> = {
  response: ItemsWithCount<T>
  getData: (params?: GetResourcesParams) => Promise<void>
}

export interface AdditionalPropsInterface {
  t: TFunction
  navigate: NavigateFunction
}
