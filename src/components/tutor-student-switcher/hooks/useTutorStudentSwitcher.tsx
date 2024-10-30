import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SwitcherProps } from '~/components/app-content-switcher/AppContentSwitcher'
import { useAppSelector } from '~/hooks/use-redux'
import { UserRoleEnum } from '~/types'

type UseSwitcherReturn = Pick<
  SwitcherProps,
  'onChange' | 'switchOptions' | 'active'
>

export const useTutorStudentSwitcher = (): UseSwitcherReturn => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const [active, setActive] = useState(userRole === UserRoleEnum.Tutor)

  const onChange = () => {
    setActive((prev) => !prev)
  }

  const switchOptions = {
    left: {
      text: t('findOffers.topMenu.tutorsOffers'),
      tooltip: t('findOffers.contentSwitcher.switcher-tutor')
    },
    right: {
      text: t('findOffers.topMenu.studentsRequests'),
      tooltip: t('findOffers.contentSwitcher.switcher-student')
    }
  }

  return { onChange, switchOptions, active }
}
