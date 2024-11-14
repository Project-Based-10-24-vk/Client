import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { styles } from '~/pages/categories/Categories.styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Box from '@mui/material/Box'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import CategoriesList from '~/components/categories-list/CategoriesList'
import DirectionLink from '~/components/direction-link/DirectionLink'
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
          linkTo={authRoutes.subjects.path}
          title={t('categoriesPage.showAllSubjects')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoryNamesLoading}
          onFocus={getCategoriesNames}
          options={categoriesNamesItems}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>
      <CategoriesList query={match} />
    </PageWrapper>
  )
}

export default Categories
