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
  const [count, setCount] = useState(0)
  const breakpoints = useBreakpoints()
  const ScreenBasedLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const [visibleCards, setVisibleCards] = useState(0)
  const params = useMemo(
    () => ({
      name: query,
      limit: ScreenBasedLimit,
      skip: visibleCards
    }),
    [query, visibleCards]
  )

  const { t } = useTranslation()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: AxiosResponse<ItemsWithCount<CategoryInterface>> =
          await categoryService.getCategories(params)

        setCategories((prev) => [...prev, ...response.data.items])
        setCount(response.data.count)
      } catch (error) {
        console.error('error', error)
        setCategories([])
      }
    }
    void fetchCategories()
  }, [params])

  const cardElements =
    categories.length > 0
      ? categories.map((card) => {
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
    setVisibleCards((prev) => {
      const newValue = prev + ScreenBasedLimit
      return newValue
    })
  }

  const hasMoreCards = visibleCards < count

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
