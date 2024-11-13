import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import { styles } from '~/containers/email-confirm-modal/EmailConfirmModal.styles'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import imgSendEmail from '~/assets/img/email-confirmation-modals/email-verification.svg'

const EmailSendModal = ({ email }) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.box}>
      <ImgTitleDescription
        description={`${t('signup.confirmEmailMessage')} ${email}. ${t('signup.confirmEmailDesc')}`}
        img={imgSendEmail}
        style={styles}
        title={t('signup.confirmEmailTitle')}
      />
    </Box>
  )
}

export default EmailSendModal
