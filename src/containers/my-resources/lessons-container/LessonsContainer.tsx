import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/lessons-container/LessonsContainer.constants'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import AppButton from '~/components/app-button/AppButton'
import Loader from '~/components/loader/Loader'
import { useSnackBarContext } from '~/context/snackbar-context'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import usePagination from '~/hooks/table/use-pagination'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import { ResourceService } from '~/services/resource-service'
import { defaultResponses, snackbarVariants } from '~/constants'
import {
  ErrorResponse,
  GetResourcesCategoriesParams,
  ItemsWithCount,
  Lessons,
  ResourcesTabsEnum
} from '~/types'

//this will be replaced with handlers that redirect to apropriate page/component
const mockEdit = (id: string) => console.log(`edit lesson ${id}`)
const mockAdd = () => console.log(`add new lesson`)

const LessonsContainer = () => {
  const { t } = useTranslation()
  const searchTitle = useRef<string>('')
  const { page, handleChangePage } = usePagination()
  const sortOptions = useSort({ initialSort })
  const breakpoints = useBreakpoints()
  const { setAlert } = useSnackBarContext()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const { sort } = sortOptions

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `${error.message}` : ''
      })
    },
    [setAlert]
  )

  const getLessons = useCallback(
    () =>
      ResourceService.getLessons({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        name: searchTitle.current,
        category: selectedItems
      }),
    [page, itemsPerPage, sort, searchTitle, selectedItems]
  )

  const deleteLesson = useCallback(
    (id?: string) => ResourceService.deleteLesson(id ?? ''),
    []
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Lessons>,
    GetResourcesCategoriesParams
  >({
    service: getLessons,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const columnsToShow = ajustColumns<Lessons>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const props = {
    actions: { onEdit: mockEdit },
    columns: columnsToShow,
    data: { response, getData: fetchData },
    services: { deleteService: deleteLesson },
    pagination: { page, onChange: handleChangePage },
    sort: sortOptions,
    itemsPerPage,
    resource: ResourcesTabsEnum.Lessons
  }

  return (
    <Box>
      <AddResourceWithInput
        button={
          <AppButton onClick={mockAdd}>
            {t('myResourcesPage.lessons.addBtn')}
          </AppButton>
        }
        fetchData={fetchData}
        link={''}
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Lessons> {...props} />
      )}
    </Box>
  )
}

export default LessonsContainer
