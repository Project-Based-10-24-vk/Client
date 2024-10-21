import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardsWithButton from '~/containers/guest-home-page/cards-with-button/CardsWithButton'
import {
  studentCardBoxArray,
  tutorCardBoxArray
} from '~/containers/guest-home-page/how-it-works/CardBoxArrays'
import { styles } from '~/containers/guest-home-page/how-it-works/HowItWorks.styles'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { TypographyVariantEnum, UserRoleEnum } from '~/types'

const HowItWorks = () => {
  const { t } = useTranslation()

  const [isTutor, setIsTutor] = useState(false)

  const onChange = () => {
    setIsTutor(!isTutor)
  }

  const switchOptions = {
    left: {
      text: t('guestHomePage.howItWorks.learnFromExperts')
    },
    right: {
      text: t('guestHomePage.howItWorks.shareYourExperience')
    }
  }

  return (
    <Box id={guestRoutes.navBar.howItWorks.route}>
      <Box sx={styles.container}>
        <Typography sx={styles.title}>
          {t('guestHomePage.howItWorks.title')}
        </Typography>
        <AppContentSwitcher
          active={isTutor}
          onChange={onChange}
          styles={styles.switch}
          switchOptions={switchOptions}
          typographyVariant={TypographyVariantEnum.H6}
        />
        <CardsWithButton
          array={isTutor ? tutorCardBoxArray : studentCardBoxArray}
          btnText={
            isTutor
              ? t('guestHomePage.howItWorks.tutor.buttonText.title')
              : t('guestHomePage.howItWorks.student.buttonText.title')
          }
          isTutor={isTutor}
          role={isTutor ? UserRoleEnum.Tutor : UserRoleEnum.Student}
        />
      </Box>
    </Box>
  )
}

export default HowItWorks
