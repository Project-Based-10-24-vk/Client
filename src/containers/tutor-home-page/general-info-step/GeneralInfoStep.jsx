import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import AppSelect from '~/components/app-select/AppSelect'
import AppTextField from '~/components/app-text-field/AppTextField'
// import useForm from '~/hooks/use-form'
// import { useStepContext } from '~/context/step-context'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const optionsCountry = [{ title: 'errors.UNKNOWN_ERROR', value: '' }]
  const isReadOnly = { readOnly: true }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box>
          <Typography sx={styles.textblock} variant='body1'>
            {t('becomeTutor.generalInfo.title')}
          </Typography>

          <Box sx={styles.form}>
            <AppTextField fullWidth label={t('common.labels.firstName')} />

            <AppTextField fullWidth label={t('common.labels.lastName')} />
          </Box>
          <Box sx={styles.form}>
            <AppSelect
              fields={optionsCountry}
              inputProps={isReadOnly}
              label={t('common.labels.country')}
            />

            <AppSelect
              fields={optionsCountry}
              label={t('common.labels.city')}
            />
          </Box>

          <AppTextField
            fullWidth
            helperText='0/100'
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            multiline
            rows={5}
            sx={styles.textarea}
            withHelperText
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
