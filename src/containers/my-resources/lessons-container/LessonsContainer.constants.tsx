import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/my-resources/lessons-container/LessonsContainer.styles'
import AppChip from '~/components/app-chip/AppChip'
import IconTitleDescription from '~/components/icon-title-description/IconTitleDescription'
import { authRoutes } from '~/router/constants/authRoutes'
import { createUrlPath, getFormattedDate } from '~/utils/helper-functions'
import lessonIcon from '~/assets/img/my-resources-page/lesson.svg'
import {
  AdditionalPropsInterface,
  Lessons,
  RemoveColumnRules,
  SortEnum,
  TableColumn
} from '~/types'

//this will be replaced with real path for lesson view
const mockLessonViewPath = authRoutes.myResources.root.path

export const columns: TableColumn<Lessons>[] = [
  {
    label: 'myResourcesPage.lessons.title',
    field: 'title',
    calculatedCellValue: (
      item: Lessons,
      { navigate }: AdditionalPropsInterface
    ) => {
      const handleClick = () => {
        {
          navigate(createUrlPath(mockLessonViewPath))
        }
      }
      return (
        <Box onClick={handleClick} sx={styles.lessonContainer}>
          <IconTitleDescription
            description={item.description}
            icon={
              <Box sx={styles.iconWrapper}>
                <img src={lessonIcon} />
              </Box>
            }
            sx={styles.iconTitleDescription}
            title={item.title}
          />
        </Box>
      )
    }
  },
  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
    calculatedCellValue: (item: Lessons, { t }: AdditionalPropsInterface) =>
      item.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {item.category}
        </AppChip>
      ) : (
        <Typography sx={styles.date}>
          {t('myResourcesPage.categories.noCategory')}
        </Typography>
      )
  },
  {
    label: 'myResourcesPage.lessons.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Lessons) => (
      <Typography sx={styles.date}>
        {getFormattedDate({ date: item.updatedAt })}
      </Typography>
    )
  }
]

export const removeColumnRules: RemoveColumnRules<Lessons> = {
  mobile: ['myResourcesPage.lessons.updated']
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const itemsLoadLimit = {
  default: 10,
  mobile: 6,
  tablet: 8
}
