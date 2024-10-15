import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'
import SignupStudentForm from '~/containers/guest-home-page/signup-form/SignupStudentForm'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'
import style from './SignupDialog.styles'

const SignupTutorDialog = () => {
  const { t } = useTranslation()
  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>
        <Box alt='signup' component='img' src={tutorImg} sx={style.img} />
      </Box>
      <Box sx={style.formContainer}>
        <Typography sx={style.title} variant='h2'>
          {t('signup.head.tutor')}
        </Typography>
        <Box sx={style.form}>
          <SignupStudentForm />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupTutorDialog
