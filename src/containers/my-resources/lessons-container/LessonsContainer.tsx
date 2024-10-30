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
import Loader from '~/components/loader/Loader'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import usePagination from '~/hooks/table/use-pagination'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import { ResourceService } from '~/services/resource-service'
import { defaultResponses } from '~/constants'
import {
  GetResourcesCategoriesParams,
  ItemsWithCount,
  Lessons,
  ResourcesTabsEnum
} from '~/types'

const mockEdit = (id: string) => console.log(`edit lesson ${id}`)

const mockFetch = () => Promise.resolve()

const LessonsContainer = () => {
  const { t } = useTranslation()
  const searchTitle = useRef<string>('')
  const { page, handleChangePage } = usePagination()
  const sortOptions = useSort({ initialSort })
  const breakpoints = useBreakpoints()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const { sort } = sortOptions

  const getLessons = useCallback(
    () =>
      ResourceService.getLessons({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        title: searchTitle.current
      }),
    [page, itemsPerPage, sort, searchTitle]
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
    defaultResponse: defaultResponses.itemsWithCount
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
        btnText={t('myResourcesPage.lessons.addBtn')}
        fetchData={mockFetch}
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
