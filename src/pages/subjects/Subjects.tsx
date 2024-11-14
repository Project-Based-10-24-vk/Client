import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { styles } from '~/pages/subjects/Subjects.styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Box from '@mui/material/Box'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import DirectionLink from '~/components/direction-link/DirectionLink'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { authRoutes } from '~/router/constants/authRoutes'
import { useModalContext } from '~/context/modal-context'
import { getOpositeRole, getScreenBasedLimit } from '~/utils/helper-functions'
import { mapArrayByField } from '~/utils/map-array-by-field'
import useBreakpoints from '~/hooks/use-breakpoints'
import useLoadMore from '~/hooks/use-load-more'
import { useAppSelector } from '~/hooks/use-redux'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { itemsLoadLimit } from '~/constants'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import {
  CategoryNameInterface,
  ItemsWithCount,
  SizeEnum,
  SubjectInterface,
  SubjectNameInterface
} from '~/types'

const Subjects = () => {
  const [match, setMatch] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const params = useMemo(() => ({ name: match }), [match])

  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? ''

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const transform = useCallback(
    (data: ItemsWithCount<SubjectNameInterface>) => {
      const names = data.items
      return mapArrayByField(names, 'name')
    },
    []
  )

  const {
    loading: subjectNamesLoading,
    response: subjectsNamesItems,
    fetchData
  } = useSubjectsNames({
    fetchOnMount: false,
    category: categoryId,
    transform
  })

  const getSubjectNames = () => {
    !isFetched && void fetchData()
    setIsFetched(true)
  }

  const getSubjects = useCallback(
    (data?: Pick<SubjectInterface, 'name'>) =>
      subjectService.getSubjectsWithParamsAndCategoryId(data, categoryId),
    [categoryId]
  )

  const {
    data: subjects,
    loading: subjectsLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<SubjectInterface, Pick<SubjectInterface, 'name'>>({
    service: getSubjects,
    limit: cardsLimit,
    params
  })

  const oppositeRole = getOpositeRole(userRole)

  const cards = useMemo(
    () =>
      subjects.map((item: SubjectInterface, idx) => {
        return (
          <CardWithLink
            description={`${item.totalOffers ? item.totalOffers[oppositeRole] : 0} ${t(
              'categoriesPage.offers'
            )}`}
            img={serviceIcon}
            key={item._id + idx}
            link={`${authRoutes.findOffers.path}?categoryId=${categoryId}&subjectId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [subjects, categoryId, oppositeRole, t]
  )

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    setIsFetched(false)
    searchParams.set('categoryId', value?._id ?? '')
    setCategoryName(value?.name ?? '')
    setSearchParams(searchParams)
    resetData()
  }

  const onResponseCategory = (response: CategoryNameInterface[]) => {
    const category = response.find((option) => option._id === categoryId)
    setCategoryName(category?.name ?? '')
  }

  const getNames = useCallback(
    (data: ItemsWithCount<CategoryNameInterface>) => {
      const names = data.items
      return names
    },
    []
  )

  const autoCompleteCategories = (
    <AsyncAutocomplete
      axiosProps={{ onResponse: onResponseCategory, transform: getNames }}
      labelField='name'
      onChange={onCategoryChange}
      service={categoryService.getCategoriesNames}
      sx={styles.categoryInput}
      textFieldProps={{
        label: t('breadCrumbs.categories')
      }}
      value={categoryId}
      valueField='_id'
    />
  )

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('subjectsPage.subjects.description')}
        style={styles.titleWithDescription}
        title={t('subjectsPage.subjects.title', {
          category: categoryName
        })}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.backToAllCategories')}
        />
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.findOffers.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        {!breakpoints.isMobile && autoCompleteCategories}
        <SearchAutocomplete
          loading={subjectNamesLoading}
          onFocus={getSubjectNames}
          onSearchChange={resetData}
          options={subjectsNamesItems}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('subjectsPage.subjects.searchLabel')
          }}
        />
      </AppToolbar>
      {breakpoints.isMobile && autoCompleteCategories}
      {!subjects.length && !subjectsLoading ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'subjects' })}
          description={t('errorMessages.tryAgainText', { name: 'subjects' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={subjectsLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Subjects
