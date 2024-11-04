import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { emptyField } from '~/utils/validations/common'
import {
  email,
  firstName,
  lastName,
  password
} from '~/utils/validations/signup'
import useForm from '~/hooks/use-form'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useSignUpMutation } from '~/services/auth-service'
import { snackbarVariants } from '~/constants'
import type { UserRole } from '~/types'
import EmailSendModal from '../email-send-modal/EmailSendModal'
import style from './SignupForm.styles'

interface SignupFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const initialValues: SignupFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignupForm = ({ role }: { role: UserRole }) => {
  const [terms, setTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [registerUser] = useSignUpMutation()

  const validateConfirmPassword = (
    password: string,
    data: SignupFormData
  ): string | undefined => {
    return emptyField(
      password,
      'common.errorMessages.emptyField',
      password !== data.password
        ? 'common.errorMessages.passwordsDontMatch'
        : ''
    )
  }

  const { showInputText: showPassword, inputVisibility: passwordVisibility } =
    useInputVisibility()

  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          setIsLoading(true)
          const newUser = { ...data, role }
          const user = await registerUser(newUser).unwrap()
          closeModal()
          openModal({
            component: <EmailSendModal email={user.userEmail} />
          })
        } catch (e) {
          const error = e as { data: { code: string } }

          setAlert({
            severity: snackbarVariants.error,
            message: `errors.${error.data.code}`
          })
        } finally {
          setIsLoading(false)
        }
      },
      initialValues,
      validations: {
        email,
        password,
        confirmPassword: validateConfirmPassword,
        lastName,
        firstName
      }
    }
  )
  const isDisabled = Object.values(errors).some((error) => error !== '')

  return (
    <Box component='form' onSubmit={handleSubmit} sx={style.form}>
      <Box sx={style.boxMultipleInputs}>
        <AppTextField
          autoFocus
          errorMsg={t(errors.firstName)}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleInputChange('firstName')}
          required
          type='text'
          value={data.firstName}
        />
        <AppTextField
          errorMsg={t(errors.lastName)}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleInputChange('lastName')}
          required
          type='text'
          value={data.lastName}
        />
      </Box>
      <AppTextField
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleInputChange('email')}
        required
        type='email'
        value={data.email}
      />
      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleInputChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />
      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleInputChange('confirmPassword')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <Typography variant='body2'>
            {t('signup.iAgree')} {t('common.labels.terms')} {t('signup.and')}{' '}
            {t('common.labels.privacyPolicy')}
          </Typography>
        }
        onChange={(_, checked: boolean) => setTerms(checked)}
        value={terms}
      />
      <AppButton
        disabled={isDisabled || !terms}
        loading={isLoading}
        type='submit'
      >
        {t('signup.signup')}
      </AppButton>
    </Box>
  )
}

export default SignupForm
