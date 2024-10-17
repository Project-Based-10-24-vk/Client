import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import useForm from '~/hooks/use-form'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

const GeneralInfoStep = ({ btnsBox }) => {
  const { stepData } = useStepContext()
  const { t } = useTranslation()
  const { handleInputChange, data } = useForm({
    initialValues: stepData.generalInfo.data
  })

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
            <AppTextField
              fullWidth
              label={t('common.labels.firstName')}
              onChange={handleInputChange('firstName')}
              value={data.firstName}
            />

            <AppTextField
              fullWidth
              label={t('common.labels.lastName')}
              onChange={handleInputChange('lastName')}
              value={data.lastName}
            />
          </Box>

          <Box sx={styles.form}>
            <AsyncAutocomplete
              fullWidth
              textFieldProps={{ label: t('common.labels.country') }}
              value={data.country}
            />

            <AsyncAutocomplete
              fullWidth
              textFieldProps={{ label: t('common.labels.city') }}
              value={data.city}
            />
          </Box>

          <AppTextArea
            fullWidth
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxLength={70}
            onChange={handleInputChange('professionalSummary')}
            sx={styles.textarea}
            value={data.professionalSummary}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
