import { useEffect, useMemo, useState } from 'react'
import type { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'

import { Box, Stack, Typography } from '@mui/material'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import type { CategoryInterface, ItemsWithCount } from '~/types'
import CardWithLink from '../card-with-link/CardWithLink'
import { styles } from './PopularCategories.styles'

const PopularCategories = () => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<CategoryInterface[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: AxiosResponse<ItemsWithCount<CategoryInterface>> =
          await categoryService.getCategories({ limit: 9, skip: 0 })

        if (response.data.items.length > 0) {
          setCategories(response.data.items)
        }
      } catch (error) {
        console.error(error)
      }
    }
    void fetchCategories()
  }, [])

  const cardElements = useMemo(
    () =>
      categories.map((card) => {
        return (
          <CardWithLink
            description={'100 offers'}
            img={card.appearance.icon}
            key={card._id}
            link={`${authRoutes.subjects.path}?category=${card._id}`}
            title={card.name}
          />
        )
      }),
    [categories]
  )

  return (
    <Stack component='section' spacing={4}>
      <Typography variant='h4'>{t('header.categoriesPopular')}</Typography>
      <Box sx={styles.cardsContainer}>{cardElements}</Box>
    </Stack>
  )
}
export default PopularCategories
