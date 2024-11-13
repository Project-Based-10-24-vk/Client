import ListAltIcon from '@mui/icons-material/ListAlt'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/add-resources/AddResources.styles'
import AppChip from '~/components/app-chip/AppChip'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import { getFormattedDate } from '~/utils/helper-functions'
import {
  AdditionalPropsInterface,
  Lesson,
  RemoveColumnRules,
  type Lessons
} from '~/types'

export const columns = [
  {
    label: 'myResourcesPage.lessons.title',
    field: 'title',
    calculatedCellValue: (lesson: Lesson) => (
      <IconExtensionWithTitle icon={<ListAltIcon />} title={lesson.title} />
    )
  },
  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
    calculatedCellValue: (lesson: Lesson, { t }: AdditionalPropsInterface) =>
      lesson.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {lesson.category.name}
        </AppChip>
      ) : (
        <Typography sx={styles.date}>
          {t('myResourcesPage.categories.noCategory')}
        </Typography>
      )
  },
  {
    label: 'myResourcesPage.lessons.lastUpdates',
    field: 'updatedAt',
    calculatedCellValue: (lesson: Lesson) =>
      getFormattedDate({ date: lesson.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<Lessons> = {
  tablet: ['myResourcesPage.lessons.lastUpdates']
}
