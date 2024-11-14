import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import { useAppSelector } from '~/hooks/use-redux'
import { locationService } from '~/services/location-service'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

const GeneralInfoStep = ({ btnsBox, setIsValidated, stepLabel }) => {
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()

  const { userFirstName, userLastName } = useAppSelector(
    (state) => state.appMain
  )

  useEffect(() => {
    const { firstName, lastName } = stepData.generalInfo.data;
  
    const newFirstName = firstName || userFirstName;
    const newLastName = lastName || userLastName;
  
    handleStepData(
      'generalInfo',
      {
        ...stepData.generalInfo.data,
        firstName: newFirstName,
        lastName: newLastName,
      },
      stepData.generalInfo.errors
    );
  }, [userFirstName, userLastName]);

  useEffect(() => {
    if (stepData[stepLabel].errors === undefined) {
      return
    }

    const allFieldsAreValid = Object.entries(stepData.generalInfo.data).every(
      ([key, value]) => key === 'city' || key === 'country' || value !== ''
    )

    setIsValidated(allFieldsAreValid)
  }, [setIsValidated, stepData, stepData.generalInfo.data, stepLabel])

  const handleInputChange = (field) => (event, newValue) => {
    const errorMessage =
      newValue.length === 0 ? `${field} can't be empty` : null
    handleStepData(
      stepLabel,
      {
        ...stepData[stepLabel].data,
        [field]: newValue,
        ...(field === 'country' ? { city: {} } : {})
      },
      { ...stepData[stepLabel].errors, [field]: errorMessage }
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
              error={stepData[stepLabel].errors?.firstName}
              errorMsg={
                stepData[stepLabel].errors?.firstName
                  ? t('step.generalInfoFields.firstName')
                  : ''
              }
              fullWidth
              label={t('common.labels.firstName')}
              onChange={(event) =>
                handleInputChange('firstName')(event, event.target.value)
              }
              value={stepData[stepLabel].data.firstName}
            />

            <AppTextField
              error={!!stepData[stepLabel].errors?.lastName}
              errorMsg={
                stepData[stepLabel].errors?.lastName
                  ? t('step.generalInfoFields.lastname')
                  : ''
              }
              fullWidth
              label={t('common.labels.lastName')}
              onChange={(event) =>
                handleInputChange('lastName')(event, event.target.value)
              }
              value={stepData[stepLabel].data.lastName}
            />
          </Box>

          <Box sx={styles.form}>
            <AsyncAutocomplete
              error={!!stepData[stepLabel].errors?.country}
              fullWidth
              labelField='name'
              onChange={(event, newValue) =>
                handleInputChange('country')(event, newValue)
              }
              service={locationService.getCountries}
              textFieldProps={{ label: t('common.labels.country') }}
              value={stepData[stepLabel].data.country?.name}
              valueField='name'
            />

            <AsyncAutocomplete
              disabled={!stepData[stepLabel].data.country?.iso2}
              error={!!stepData[stepLabel].errors?.city}
              fetchCondition={!!stepData[stepLabel].data.country?.iso2}
              fullWidth
              labelField='name'
              onChange={(event, newValue) =>
                handleInputChange('city')(event, newValue)
              }
              service={() =>
                locationService.getCities(stepData[stepLabel].data.country.iso2)
              }
              textFieldProps={{ label: t('common.labels.city') }}
              value={stepData[stepLabel].data.city?.name}
              valueField='name'
            />
          </Box>

          <AppTextArea
            error={!!stepData[stepLabel].errors?.professionalSummary}
            errorMsg={
              stepData[stepLabel].errors?.professionalSummary
                ? t('becomeTutor.experience.title')
                : ''
            }
            fullWidth
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxLength={70}
            onChange={(event) =>
              handleInputChange('professionalSummary')(
                event,
                event.target.value
              )
            }
            sx={styles.textarea}
            value={stepData[stepLabel].data.professionalSummary}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
