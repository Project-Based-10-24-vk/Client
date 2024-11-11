import { useEffect, useMemo, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'

import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import { CategoryInterface, ItemsWithCount } from '~/types'

interface CategoriesListProps {
  query: string
}

const CategoriesList = ({ query }: CategoriesListProps) => {
  const [categories, setCategories] = useState<CategoryInterface[]>([])
  const [isCategoryFound, setIsCategoryFound] = useState<boolean>(false)
  const [visibleCards, setVisibleCards] = useState(4)
  const params = useMemo(() => ({ name: query }), [query])

  const { t } = useTranslation()

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
      } catch (error) {
        console.error('error', error)
        setCategories([])
      }
    }
    void fetchCategories()
  }, [params, setIsCategoryFound])

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
