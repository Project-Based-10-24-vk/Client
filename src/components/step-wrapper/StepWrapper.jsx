import { cloneElement, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/components/step-wrapper/StepWrapper.styles'
import useSteps from '~/hooks/use-steps'

const StepWrapper = ({ children, steps }) => {
  const { activeStep, stepErrors, isLastStep, loading, stepOperation } =
    useSteps({
      steps
    })
  const { next, back, setActiveStep, handleSubmit } = stepOperation
  const { t } = useTranslation()

  const [isValidated, setIsValidated] = useState(false)

  const handleSetStep = useCallback(
    isValidated
      ? (index) => {
          setActiveStep(index)
        }
      : () => {},
    [isValidated]
  )

  const stepLabels = steps.map((step, index) => (
    <Box
      color={stepErrors[index] ? 'error.500' : 'primary.500'}
      key={step}
      onClick={() => handleSetStep(index)}
      sx={[styles.defaultTab, index === activeStep && styles.activeTab]}
      typography='caption'
    >
      {t(`step.stepLabels.${step}`)}
    </Box>
  ))

  const nextButton = isLastStep ? (
    <AppButton
      loading={loading}
      onClick={handleSubmit}
      size='small'
      sx={styles.finishBtn}
      variant='contained'
    >
      {t('common.finish')}
    </AppButton>
  ) : (
    <AppButton
      disabled={!isValidated}
      onClick={next}
      size='small'
      sx={styles.btn}
      variant='contained'
    >
      {t('common.next')}
      <EastIcon fontSize='small' />
    </AppButton>
  )

  const btnsBox = (
    <Box sx={styles.btnWrapper}>
      <AppButton
        disabled={activeStep === 0}
        onClick={back}
        size='small'
        sx={styles.btn}
        variant='outlined'
      >
        <WestIcon fontSize='small' />
        {t('common.back')}
      </AppButton>
      {nextButton}
    </Box>
  )

  return (
    <Container sx={styles.root}>
      <Box disabled={!isValidated} sx={styles.steps}>
        {stepLabels}
      </Box>
      <Box sx={styles.stepContent}>
        {cloneElement(children[activeStep], {
          btnsBox,
          setIsValidated,
          stepLabel: steps[activeStep]
        })}
      </Box>
    </Container>
  )
}

export default StepWrapper
