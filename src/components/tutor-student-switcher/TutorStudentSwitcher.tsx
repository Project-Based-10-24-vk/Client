import AppContentSwitcher from '../app-content-switcher/AppContentSwitcher'
import { useTutorStudentSwitcher } from './hooks/useTutorStudentSwitcher'

export const TutorStudentSwitcher = () => {
  const { active, onChange, switchOptions } = useTutorStudentSwitcher()

  return (
    <AppContentSwitcher
      active={active}
      onChange={onChange}
      switchOptions={switchOptions}
      typographyVariant='h6'
    />
  )
}
