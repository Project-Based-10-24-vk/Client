import { FC, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'

import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import { CategoryInterface } from '~/types'

const CategoriesList: FC = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([])
  const [visibleCards, setVisibleCards] = useState(4)

  const { t } = useTranslation()

  const fetchCategories = async () => {
    try {
      const response: AxiosResponse<CategoryInterface[]> =
        await categoryService.getCategories()

      setCategories(response.data)
    } catch (error) {
      console.error('error', error)
      setCategories([])
    }
  }

  useEffect(() => {
    void fetchCategories()
  }, [])

  const cardElements =
    categories.length > 0
      ? categories.slice(0, visibleCards).map((card) => {
          return (
            <CardWithLink
              description={'100 offers'}
              img={card.appearance.icon}
              key={card._id}
              link={authRoutes.subjects.path}
              title={card.name}
            />
          )
        })
      : []

  const handleLoadMore = () => {
    setTimeout(() => {
      setVisibleCards((prev) => {
        const newValue = prev + 4
        return newValue
      })
    }, 1000)
  }

  const hasMoreCards = visibleCards < categories.length

  return (
    <PageWrapper>
      <CardsList
        btnText={t('categoriesPage.viewMore')}
        cards={cardElements}
        isExpandable={hasMoreCards}
        onClick={handleLoadMore}
      />
    </PageWrapper>
  )
}

export default CategoriesList
