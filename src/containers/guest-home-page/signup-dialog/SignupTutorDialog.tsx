import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'
import { signup, tutor } from '~/constants'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import GoogleLogin from '../google-login/GoogleLogin'
import SignupForm from '../signup-form/SignupForm'
import style from './SignupDialog.styles'

const SignupTutorDialog = () => {
  const { t } = useTranslation()
  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>
        <Box alt='signup' component='img' src={studentImg} sx={style.img} />
      </Box>
      <Box sx={style.formContainer}>
        <Typography sx={style.title} variant='h2'>
          {t('signup.head.tutor')}
        </Typography>
        <Box sx={style.form}>
          <SignupForm />
          <GoogleLogin
            buttonWidth={style.form.maxWidth}
            role={tutor}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupTutorDialog
