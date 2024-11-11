import { useEffect, useMemo, useState } from 'react'
import App from '~/App'
import type { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Box, Stack, Typography } from '@mui/material'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import {
  ButtonVariantEnum,
  SizeEnum,
  type CategoryInterface,
  type ItemsWithCount
} from '~/types'
import AppButton from '../app-button/AppButton'
import CardWithLink from '../card-with-link/CardWithLink'
import { styles } from './PopularCategories.styles'

const PopularCategories = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
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
      <Stack component='section' spacing='40px'>
        <Box sx={styles.cardsContainer}>{cardElements}</Box>
        <AppButton
          onClick={() => navigate(authRoutes.categories.path)}
          sx={{ width: '217px', height: '56px', alignSelf: 'center' }}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('button.viewAllCategories')}
        </AppButton>
      </Stack>
    </Stack>
  )
}
export default PopularCategories
