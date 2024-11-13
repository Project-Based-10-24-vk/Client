import OffersList from '~/containers/offers-list/OffersList'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import PopularCategories from '~/components/popular-categories/PopularCategories'

const FindOffers = () => {
  return (
    <PageWrapper>
      <OffersList />
      <PopularCategories sx={{ paddingTop: '100px' }} />
    </PageWrapper>
  )
}

export default FindOffers
