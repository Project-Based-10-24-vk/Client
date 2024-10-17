import { useTranslation } from 'react-i18next'

import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import useInputVisibility from '~/hooks/use-input-visibility'
import style from './SignupForm.styles'

const SignupForm = () => {
  const { t } = useTranslation()
  const { showInputText: showPassword, inputVisibility: passwordVisibility } =
    useInputVisibility()
  return (
    <Box component='form' sx={style.form}>
      <Box sx={style.boxMultipleInputs}>
        <AppTextField
          autoFocus
          fullWidth
          label={t('common.labels.firstName')}
          required
          type='text'
        />
        <AppTextField
          fullWidth
          label={t('common.labels.lastName')}
          required
          type='text'
        />
      </Box>
      <AppTextField
        fullWidth
        label={t('common.labels.email')}
        required
        type='email'
      />
      <AppTextField
        InputProps={passwordVisibility}
        fullWidth
        label={t('common.labels.password')}
        required
        type={showPassword ? 'text' : 'password'}
      />
      <AppTextField
        InputProps={passwordVisibility}
        fullWidth
        label={t('common.labels.confirmPassword')}
        required
        type={showPassword ? 'text' : 'password'}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <Typography variant='body2'>
            {t('signup.iAgree')} {t('common.labels.terms')} {t('signup.and')}{' '}
            {t('common.labels.privacyPolicy')}
          </Typography>
        }
      />
      <AppButton disabled>{t('signup.signup')}</AppButton>
    </Box>
  )
}

export default SignupForm
