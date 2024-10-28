import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import CategoriesList from '~/components/categories-list/CategoriesList'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

const Categories = () => {
  return (
    <PageWrapper>
      <OfferRequestBlock />
      <CategoriesList />
    </PageWrapper>
  )
}

export default Categories
