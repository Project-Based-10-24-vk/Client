import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'
import studentImg from '~/assets/img/signup-dialog/student.svg'

const SignupStudentDialog = () => {
  const { t } = useTranslation()
  return (
    <Box>
      <Box>
        <Box alt='signup' component='img' src={studentImg} />
      </Box>
      <Box>
        <Typography variant='h2'>{t('signup.head.student')}</Typography>
      </Box>
    </Box>
  )
}

export default SignupStudentDialog
