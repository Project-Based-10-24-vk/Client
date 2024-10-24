import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

const GeneralInfoStep = ({ btnsBox, setIsValidated, stepLabel }) => {
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()

  const [data, setData] = useState(stepData.generalInfo.data)

  useEffect(() => {
    handleStepData(stepLabel, data, data.errors)
  }, [data, stepLabel, handleStepData])

  useEffect(() => {
    if (data.errors === undefined) {
      return
    }

    const allFieldsAreValid = data.errors
      ? Object.values(data.errors).every((value) => value === null)
      : true

    if (allFieldsAreValid) {
      setIsValidated(true)
    } else {
      setIsValidated(false)
    }
  }, [data])

  const handleInputChange = (field) => (event) => {
    const value = event.target.value
    const errorMessage = `${field} can't be empty`

    setData((prevData) =>
      value.length === 0
        ? {
            ...prevData,
            [field]: value,
            errors: { ...prevData.errors, [field]: errorMessage }
          }
        : {
            ...prevData,
            [field]: value,
            errors: { ...prevData.errors, [field]: null }
          }
    )
  }

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
              error={data.errors?.firstName}
              errorMsg={
                data.errors?.firstName
                  ? t('step.generalInfoFields.firstName')
                  : ''
              }
              fullWidth
              label={t('common.labels.firstName')}
              onChange={handleInputChange('firstName')}
              value={data.firstName}
            />

            <AppTextField
              error={!!data.errors?.lastName}
              errorMsg={
                data.errors?.lastName
                  ? t('step.generalInfoFields.lastname')
                  : ''
              }
              fullWidth
              label={t('common.labels.lastName')}
              onChange={handleInputChange('lastName')}
              value={data.lastName}
            />
          </Box>

          <Box sx={styles.form}>
            <AsyncAutocomplete
              error={!!data.errors?.country}
              fullWidth
              onChange={handleInputChange('country')}
              textFieldProps={{ label: t('common.labels.country') }}
              value={data.country}
            />

            <AsyncAutocomplete
              error={!!data.errors?.city}
              fullWidth
              onChange={handleInputChange('country')}
              textFieldProps={{ label: t('common.labels.city') }}
              value={data.city}
            />
          </Box>

          <AppTextArea
            error={!!data.errors?.professionalSummary}
            errorMsg={
              data.errors?.professionalSummary
                ? t('becomeTutor.experience.title')
                : ''
            }
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
