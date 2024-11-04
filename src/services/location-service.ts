import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import { CityInterface, CountryInterface, ItemsWithCount } from '~/types'

export const locationService = {
  getCountries: (): Promise<
    AxiosResponse<ItemsWithCount<CountryInterface>>
  > => {
    return axiosClient.get(URLs.location.getCountries)
  },

  getCities: (
    countryCode: string
  ): Promise<AxiosResponse<ItemsWithCount<CityInterface>>> => {
    const cities = createUrlPath(URLs.location.getCities)
    const countries = createUrlPath(URLs.location.getCountries)
    return axiosClient.get(`${countries}/${countryCode}${cities}`)
  }
}
