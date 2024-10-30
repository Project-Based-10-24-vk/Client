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
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import usePagination from '~/hooks/table/use-pagination'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import { ResourceService } from '~/services/resource-service'
import { ItemsWithCount, Lessons, ResourcesTabsEnum } from '~/types'

//mock data
const mockLessons: ItemsWithCount<Lessons> = {
  count: 3,
  items: [
    {
      _id: '100',
      title: 'Lesson 1',
      category: { name: 'old category', _id: '' },
      description: 'description',
      createdAt: '2024-10-15T19:33:15.640+00:00',
      updatedAt: '2024-10-28T19:33:15.640+00:00'
    },
    {
      _id: '200',
      title: 'Lesson 2',
      category: { name: 'new category', _id: '' },
      description: 'description',
      createdAt: '2024-10-19T19:33:15.640+00:00',
      updatedAt: '2024-10-20T19:33:15.640+00:00'
    },
    {
      _id: '300',
      title: 'Lesson 3',
      category: { name: 'new category', _id: '' },
      description: 'description',
      createdAt: '2024-10-10T10:33:15.640+00:00',
      updatedAt: '2024-10-11T11:33:15.640+00:00'
    }
  ]
}

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

  //later this will be replaced whith apropriate service
  const deleteLesson = useCallback(
    (id?: string) => ResourceService.deleteQuestion(id ?? ''),
    []
  )

  const columnsToShow = ajustColumns<Lessons>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const props = {
    actions: { onEdit: mockEdit },
    columns: columnsToShow,
    data: { response: mockLessons, getData: mockFetch },
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
      <MyResourcesTable<Lessons> {...props} />
    </Box>
  )
}

export default LessonsContainer
