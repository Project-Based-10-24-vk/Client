import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { styles } from '~/pages/categories/Categories.styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Box from '@mui/material/Box'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import CategoriesList from '~/components/categories-list/CategoriesList'
import DirectionLink from '~/components/direction-link/DirectionLink'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { authRoutes } from '~/router/constants/authRoutes'
import { mapArrayByField } from '~/utils/map-array-by-field'
import useCategoriesNames from '~/hooks/use-categories-names'
import { CategoryNameInterface, ItemsWithCount, SizeEnum } from '~/types'

const Categories = () => {
  const [match, setMatch] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isSearchButtonClicked, setIsSearhButtonClicked] =
    useState<boolean>(false)
  const [isCategoryFound, setIsCategoryFound] = useState<boolean>(false)
  const { t } = useTranslation()

  const transform = useCallback(
    (data: ItemsWithCount<CategoryNameInterface>) => {
      const names = data.items
      return mapArrayByField(names, 'name')
    },
    []
  )

  const {
    loading: categoryNamesLoading,
    response: categoriesNamesItems,
    fetchData
  } = useCategoriesNames({
    fetchOnMount: false,
    transform
  })

  const getCategoriesNames = () => {
    !isFetched && void fetchData()
    setIsFetched(true)
  }

  useEffect(() => {
    if (match) {
      const categoryArray = categoriesNamesItems.filter(
        (category) => category === match
      )
      if (categoryArray.length === 0) {
        setIsCategoryFound(true)
      } else {
        setIsCategoryFound(false)
      }
    }
    if (!match) {
      setIsCategoryFound(false)
    }
  }, [isSearchButtonClicked, categoriesNamesItems, match])

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />
      <Box sx={styles.navigation}>
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.findOffers.path}
          title={t('categoriesPage.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoryNamesLoading}
          onFocus={getCategoriesNames}
          onSearchChange={() => setIsSearhButtonClicked(!isSearchButtonClicked)}
          options={categoriesNamesItems}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>
      {isCategoryFound && (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'category' })}
          description={t('errorMessages.tryAgainText', { name: 'category' })}
        />
      )}
      <CategoriesList query={match} />
    </PageWrapper>
  )
}

export default Categories
