import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/guest-home-page/forgot-password/ForgotPassword.styles'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { email } from '~/utils/validations/login'
import useForm from '~/hooks/use-form'
import { AuthService } from '~/services/auth-service'
import { snackbarVariants } from '~/constants'
import info from '~/assets/img/guest-home-page/info.svg'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const [loading, setLoading] = useState(false)
  const { setAlert } = useSnackBarContext()

  const backToLogin = () => {
    openModal({ component: <LoginDialog /> })
  }

  const sendEmail = async (data) => {
    try {
      setLoading(true)
      await AuthService.forgotPassword(data)
      openModal(
        {
          component: (
            <NotificationModal
              buttonTitle={t('common.confirmButton')}
              description={description}
              img={info}
              onClose={closeModal}
              title={t('login.passwordReset')}
            />
          )
        },
        5000
      )
    } catch (e) {
      setAlert({
        severity: snackbarVariants.error,
        message: `errors.${e.response.data.code}`
      })
    } finally {
      setLoading(false)
    }
  }

  const { handleSubmit, handleInputChange, handleBlur, errors, data } = useForm(
    {
      onSubmit: async () => sendEmail(data),
      initialValues: { email: '' },
      validations: { email }
    }
  )

  const description = (
    <Typography component='span'>
      {t('login.weSentEmail')}
      <Typography component='span' variant='subtitle2'>
        {data.email}
      </Typography>
      {t('login.emailArrive')}
    </Typography>
  )

  return (
    <Box sx={styles.root}>
      <TitleWithDescription
        description={t('login.enterEmail')}
        style={styles.titleWithDescription}
        title={t('login.forgotPassword')}
      />

      <Box component='form' onSubmit={handleSubmit}>
        <AppTextField
          autoFocus
          errorMsg={t(errors.email)}
          fullWidth
          label={t('common.labels.email')}
          onBlur={handleBlur('email')}
          onChange={handleInputChange('email')}
          required
          size='large'
          sx={{ margin: '1.5rem 0' }}
          type='email'
          value={data.email}
        />
        <AppButton loading={loading} sx={styles.sentPassword} type='submit'>
          {t('login.sendPassword')}
        </AppButton>
      </Box>

      <Button
        onClick={backToLogin}
        size='large'
        sx={styles.backButton}
        variant='text'
      >
        {t('login.backToLogin')}
      </Button>
    </Box>
  )
}

export default ForgotPassword
