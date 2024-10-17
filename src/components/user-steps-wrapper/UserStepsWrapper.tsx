import { FC, useContext, useEffect, useState } from 'react'

import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import {
  initialValues,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { ConfirmationDialogContext } from '~/context/confirm-context'
import { StepProvider } from '~/context/step-context'
import { markFirstLoginComplete } from '~/redux/reducer'
import { useAppDispatch } from '~/hooks/use-redux'
import { student } from '~/constants'

interface UserStepsWrapperProps {
  userRole: string
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useAppDispatch()
  const { setNeedConfirmation } = useContext(ConfirmationDialogContext)
  setNeedConfirmation(true)

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const childrenArr = [
    <GeneralInfoStep
      isUserFetched={isUserFetched}
      key='1'
      setIsUserFetched={setIsUserFetched}
    />,
    <SubjectsStep key='2' />,
    <LanguageStep key='3' />,
    <AddPhotoStep key='4' />
  ]

  const stepLabels = userRole === student ? '' : tutorStepLabels

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
