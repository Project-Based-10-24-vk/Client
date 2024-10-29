import { useEffect, useMemo } from 'react'

import { AutocompleteProps } from '@mui/material/Autocomplete'
import { TextFieldProps } from '@mui/material/TextField'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import useAxios, { UseAxiosProps } from '~/hooks/use-axios'
import {
  CategoriesParams,
  Category,
  CategoryInterface,
  ItemsWithCount,
  ServiceFunction
} from '~/types'

interface AsyncAutocompleteProps<
  T extends ItemsWithCount<CategoryInterface>,
  F extends boolean | undefined
> extends Omit<
    AutocompleteProps<T['items'][number], undefined, undefined, F>,
    'value' | 'options' | 'renderInput'
  > {
  service: ServiceFunction<T, CategoriesParams>
  valueField?: keyof T['items'][number]
  labelField?: keyof T['items'][number]
  value: T['items'][number][keyof T['items'][number]] | null | Category
  fetchCondition?: boolean
  textFieldProps?: TextFieldProps
  fetchOnFocus?: boolean
  axiosProps?: Pick<
    UseAxiosProps<
      ItemsWithCount<CategoryInterface>,
      CategoriesParams,
      ItemsWithCount<CategoryInterface>
    >,
    'onResponse' | 'onResponseError' | 'transform'
  >
}

const AsyncAutocomplete = <
  T extends ItemsWithCount<CategoryInterface>,
  F extends boolean | undefined = undefined
>({
  fetchOnFocus,
  fetchCondition,
  textFieldProps,
  valueField,
  labelField,
  value,
  service,
  axiosProps,
  ...props
}: AsyncAutocompleteProps<T, F>) => {
  const { loading, response, fetchData } = useAxios<
    ItemsWithCount<CategoryInterface>,
    CategoriesParams
  >({
    service,
    fetchOnMount: false,
    defaultResponse: { count: 0, items: [] },
    ...axiosProps
  })

  const valueOption = useMemo(
    () =>
      response.items?.find((option) => {
        if (valueField) {
          return option[valueField as keyof typeof option] === value
        }
        return option === value
      }) || null,
    [response, value, valueField]
  )

  useEffect(() => {
    !fetchOnFocus && (fetchCondition ?? true) && void fetchData()
  }, [service])

  const getOptionLabel = useMemo(() => {
    return (option: T['items'][number]) => {
      if (labelField) {
        return option[labelField] || ''
      }
      return (option as unknown as string) || ''
    }
  }, [labelField])

  const isOptionEqualToValue = (
    option: T['items'][number],
    value: T['items'][number] | null
  ) => {
    if (valueField) {
      return option[valueField] === value?.[valueField]
    }
    return option === value
  }

  const handleFocus = () => {
    const fetchFocusCondition = fetchCondition ?? response.count === 0
    if (fetchOnFocus && fetchFocusCondition) {
      void fetchData()
    }
  }

  return (
    <AppAutoComplete
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      loading={loading}
      onFocus={handleFocus}
      options={response.items || []}
      textFieldProps={textFieldProps}
      value={valueOption}
      {...props}
    />
  )
}

export default AsyncAutocomplete
