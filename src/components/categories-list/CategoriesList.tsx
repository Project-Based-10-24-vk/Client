import { useEffect, useMemo, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'

import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { authRoutes } from '~/router/constants/authRoutes'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import useBreakpoints from '~/hooks/use-breakpoints'
import { categoryService } from '~/services/category-service'
import { itemsLoadLimit } from '~/constants'
import { CategoryInterface, ItemsWithCount } from '~/types'

interface CategoriesListProps {
  query: string
}

const CategoriesList = ({ query }: CategoriesListProps) => {
  const [categories, setCategories] = useState<CategoryInterface[]>([])
  const breakpoints = useBreakpoints()
  const [visibleCards, setVisibleCards] = useState(
    getScreenBasedLimit(breakpoints, itemsLoadLimit)
  )
  const params = useMemo(() => ({ name: query }), [query])

  const { t } = useTranslation()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: AxiosResponse<ItemsWithCount<CategoryInterface>> =
          await categoryService.getCategories(params)

        setCategories(response.data.items)
      } catch (error) {
        console.error('error', error)
        setCategories([])
      }
    }
    void fetchCategories()
  }, [params])

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
