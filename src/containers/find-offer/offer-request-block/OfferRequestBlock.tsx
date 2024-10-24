import { useTranslation } from 'react-i18next'

import { translationKey } from '~/containers/find-offer/constants'
import AppButton from '~/components/app-button/AppButton'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import TitleBlock from '~/components/title-block/TitleBlock'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'
import icon from '~/assets/img/find-offer/subject_icon.png'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { isOpen, openDrawer, closeDrawer } = useDrawer()

  const handleOpenDrawer = () => {
    openDrawer()
  }

  return (
    <TitleBlock img={icon} translationKey={translationKey}>
      <AppButton
        fullWidth={isMobile}
        onClick={handleOpenDrawer}
        sx={{ py: '14px' }}
      >
        {t(`${translationKey}.button`)}
      </AppButton>
      <AppDrawer onClose={closeDrawer} open={isOpen}>
        {/* RequestForm goes here*/}
      </AppDrawer>
    </TitleBlock>
  )
}

export default OfferRequestBlock
