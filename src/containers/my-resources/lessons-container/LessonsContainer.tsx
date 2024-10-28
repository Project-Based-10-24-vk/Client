import { useState } from 'react'
import Box from '@mui/material/Box'

import {
  columns,
  initialSort,
  removeColumnRules
} from '~/containers/my-resources/lessons-container/LessonsContainer.constants'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import { ajustColumns } from '~/utils/helper-functions'
import usePagination from '~/hooks/table/use-pagination'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import { ResourcesTabsEnum } from '~/types'

//mock data
const lessonsMock = {
  count: 1,
  items: [
    {
      title: 'Lesson 1',
      category: { name: 'new category' },
      description: 'description'
    },
    {
      title: 'Lesson 2',
      category: { name: 'new category' },
      description: 'description'
    }
  ]
}

const LessonsContainer = () => {
  const { page, handleChangePage } = usePagination()
  const sortOptions = useSort({ initialSort })
  const breakpoints = useBreakpoints()
  const [selectedItemId, setSelectedItemId] = useState<string>('')
  const itemsPerPage = 10

  const onSave = () => {
    setSelectedItemId('')
  }
  const onEdit = (id: string) => setSelectedItemId(id)
  const onCancel = () => setSelectedItemId('')

  const columnsToShow = ajustColumns(
    breakpoints,
    columns(selectedItemId, onSave, onCancel),
    removeColumnRules
  )

  const props = {
    actions: { onEdit },
    columns: columnsToShow,
    data: { response: lessonsMock, getData: {} },
    services: { deleteService: {} },
    pagination: { page, onChange: handleChangePage },
    sort: sortOptions,
    itemsPerPage,
    resource: ResourcesTabsEnum.Lessons
  }

  return (
    <Box>
      <MyResourcesTable {...props} />
    </Box>
  )
}

export default LessonsContainer
