import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { styles } from '~/pages/find-offers/FindOffers.styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import OffersList from '~/containers/offers-list/OffersList'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import DirectionLink from '~/components/direction-link/DirectionLink'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { authRoutes } from '~/router/constants/authRoutes'
import { mapArrayByField } from '~/utils/map-array-by-field'
import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import {
  CategoryNameInterface,
  ItemsWithCount,
  SizeEnum,
  SubjectInterface,
  SubjectNameInterface
} from '~/types'

const FindOffers = () => {
  const { t } = useTranslation()
  const [match, setMatch] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? ''
  const [categoryName, setCategoryName] = useState<string>('')
  const subjectId = searchParams.get('subjectId') ?? ''
  const [subjectName, setSubjectName] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)

  const getCategoriesNames = useCallback(
    (data: ItemsWithCount<CategoryNameInterface>) => {
      const names = data.items
      return names
    },
    []
  )

  const getSubjectsNames = useCallback(
    (data: ItemsWithCount<SubjectNameInterface>) => {
      const names = data.items
      return names
    },
    []
  )

  const fetchSubjects = useCallback(async () => {
    return await subjectService.getSubjects({ category: categoryId })
  }, [categoryId])

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    setIsFetched(false)
    searchParams.set('categoryId', value?._id ?? '')
    //added by me
    searchParams.set('subjectId', value?._id ?? '')
    setCategoryName(value?.name ?? '')
    setSearchParams(searchParams)
  }

  const onSubjectChange = (
    _: React.SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    setIsFetched(false)
    searchParams.set('subjectId', value?._id ?? '')
    setCategoryName(value?.name ?? '')
    setSearchParams(searchParams)
  }

  const onResponseCategory = (response: CategoryNameInterface[]) => {
    const category = response.find((option) => option._id === categoryId)
    setCategoryName(category?.name ?? '')
  }

  const onResponseSubject = (response: SubjectNameInterface[]) => {
    const subject = response.find((option) => option._id === subjectId)
    setSubjectName(subject?.name ?? '')
  }

  const AutoCompleteCategories = () => {
    return (
      <AsyncAutocomplete<CategoryNameInterface>
        axiosProps={{
          onResponse: onResponseCategory,
          transform: getCategoriesNames
        }}
        labelField='name'
        onChange={onCategoryChange}
        service={categoryService.getCategoriesNames}
        sx={styles.categoryInput}
        textFieldProps={{
          label: t('breadCrumbs.categories'),
          variant: 'outlined'
        }}
        value={categoryId}
        valueField='_id'
      />
    )
  }

  const AutoCompleteSubjects = () => {
    return (
      <AsyncAutocomplete<SubjectNameInterface>
        axiosProps={{
          onResponse: onResponseSubject,
          transform: getSubjectsNames
        }}
        labelField='name'
        onChange={onSubjectChange}
        service={fetchSubjects}
        sx={styles.categoryInput}
        textFieldProps={{
          label: t('breadCrumbs.subjects'),
          variant: 'outlined'
        }}
        value={subjectId}
        valueField='_id'
      />
    )
  }

  const tutors = ['tutor1', 'tutor2', 'tutor3']

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <TitleWithDescription
        description={t('findOffers.titleWithDescription.description')}
        style={styles.titleWithDescription}
        title={t('findOffers.titleWithDescription.title')}
      />
      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.subjects.path}
          title={t('offerPage.backToAllSubjects')}
        />
      </Box>
      <Box sx={styles.autocompleteWrapper}>
        <AutoCompleteCategories />
        <AutoCompleteSubjects />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        <AutoCompleteCategories />
        <AutoCompleteSubjects />
        <SearchAutocomplete
          // loading={categoryNamesLoading}
          // onFocus={getCategoriesNames}
          // options={categoriesNamesItems}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('findOffers.searchToolbar.label')
          }}
        />
      </AppToolbar>
      <OffersList />
      <PopularCategories sx={{ paddingTop: '100px' }} />
    </PageWrapper>
  )
}

export default FindOffers
