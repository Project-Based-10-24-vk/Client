import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { styles } from '~/pages/categories/Categories.styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Box from '@mui/material/Box'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import DirectionLink from '~/components/direction-link/DirectionLink'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { authRoutes } from '~/router/constants/authRoutes'
import { mapArrayByField } from '~/utils/map-array-by-field'
import useCategoriesNames from '~/hooks/use-categories-names'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { CategoryNameInterface, SizeEnum } from '~/types'

const Categories = () => {
  const [match, setMatch] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const { t } = useTranslation()

  const transform = useCallback(
    (data: CategoryNameInterface[]): string[] => mapArrayByField(data, 'name'),
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
          options={categoriesNamesItems}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>

      {/* just show how single card for category appears */}
      <CardWithLink
        description='new card'
        img={serviceIcon}
        key='1'
        link={authRoutes.subjects.path}
        title='New card'
      />
    </PageWrapper>
  )
}

export default Categories
