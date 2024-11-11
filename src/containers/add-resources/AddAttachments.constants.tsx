import { Box } from '@mui/material'
import { getFormattedDate } from '~/utils/helper-functions'
import type { Attachment, RemoveColumnRules } from '~/types'

export const columns = [
  {
    label: 'myResourcesPage.attachments.name',
    field: 'name',
    calculatedCellValue: (attachment: Attachment) => (
      <Box sx={{}}>
        {attachment.name}.{attachment.extension}
      </Box>
    )
  },
  {
    label: 'myResourcesPage.attachments.category',
    field: 'category',
    calculatedCellValue: (attachment: Attachment) => <Box sx={{}}>category</Box>
  },
  {
    label: 'myResourcesPage.attachments.lastUpdates',
    field: 'updatedAt',
    calculatedCellValue: (attachment: Attachment) =>
      getFormattedDate({ date: attachment.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<Attachment> = {
  tablet: ['myResourcesPage.attachments.lastUpdates']
}
