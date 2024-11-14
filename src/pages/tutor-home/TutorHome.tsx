import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { styles } from '~/pages/tutor-home/TutorHome.styles'
import { Stack } from '@mui/material'
import { translationKey } from '~/components/find-block/find-student-constants'
import FindBlock from '~/components/find-block/FindBlock'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { useModalContext } from '~/context/modal-context'
import { useAppSelector } from '~/hooks/use-redux'

const TutorHome = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: styles.modal
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <PageWrapper data-testid='tutorHome'>
      <Stack pt={10} spacing={10}>
        <FindBlock translationKey={translationKey} />
        <PopularCategories
          description={t('common.descriptions.tutorPopularCategories')}
          textAlight='center'
        />
      </Stack>
    </PageWrapper>
  )
}

export default TutorHome
