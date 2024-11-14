import { useEffect, useMemo, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'

import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
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
  const [isCategoryFound, setIsCategoryFound] = useState<boolean>(false)
  const [count, setCount] = useState(0)
  const breakpoints = useBreakpoints()
  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const [fetchedItems, setFetchedItems] = useState(0)
  const params = useMemo(
    () => ({
      name: query,
      limit: cardsLimit,
      skip: fetchedItems
    }),
    [query, fetchedItems, cardsLimit]
  )

  const { t } = useTranslation()

  useEffect(() => {
    setFetchedItems(0)
    setCategories([])
  }, [query, cardsLimit])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: AxiosResponse<ItemsWithCount<CategoryInterface>> =
          await categoryService.getCategories(params)

        setCategories(response.data.items)
        if (response.data.items.length === 0) {
          setIsCategoryFound(true)
        } else {
          setIsCategoryFound(false)
        }

        setCount(response.data.count)
        setCategories((prev) =>
          fetchedItems > 0
            ? [...prev, ...response.data.items]
            : response.data.items
        )
      } catch (error) {
        console.error('error', error)
        setCategories([])
      }
    }
    void fetchCategories()
  }, [params, setIsCategoryFound, fetchedItems])

  const cardElements = useMemo(
    () =>
      categories.map((card) => {
        return (
          <CardWithLink
            description={`${String(card.totalOffers)} ${t('categoriesPage.offers')}`}
            img={card.appearance.icon}
            key={card._id}
            link={`${authRoutes.subjects.path}?categoryId=${card._id}`}
            title={card.name}
          />
        )
      }),
    [categories, t]
  )

  const handleLoadMore = () => {
    setFetchedItems((prev) => prev + cardsLimit)
  }

  const hasMoreCards = fetchedItems + cardsLimit < count

  return (
    <PageWrapper>
      {!isCategoryFound ? (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cardElements}
          isExpandable={hasMoreCards}
          onClick={handleLoadMore}
        />
      ) : (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'category' })}
          description={t('errorMessages.tryAgainText', { name: 'category' })}
        />
      )}
    </PageWrapper>
  )
}

export default CategoriesList
