import { useTranslation } from 'react-i18next'

import { Box } from '@mui/material'
import AppTextField from '~/components/app-text-field/AppTextField'
import useInputVisibility from '~/hooks/use-input-visibility'
import style from './SignupForm.styles'

const SignupStudentForm = () => {
  const { t } = useTranslation()
  const { showInputText: showPassword, inputVisibility: passwordVisibility } =
    useInputVisibility()
  return (
    <Box component='form'>
      <Box sx={style.boxMultipleInputs}>
        <AppTextField
          autoFocus
          label={t('common.labels.firstName')}
          required
          type='text'
        />
        <AppTextField
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
    </Box>
  )
}

export default SignupStudentForm
