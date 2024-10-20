import { FC } from 'react'

import GuestIcons from '~/containers/navigation-icons/guest-icons/GuestIcons'
import UserIcons from '~/containers/navigation-icons/user-icons/UserIcons'
import { useAppSelector } from '~/hooks/use-redux'

interface NavigationIconsProps {
  setSidebarOpen: () => void
}

const NavigationIcons: FC<NavigationIconsProps> = ({ setSidebarOpen }) => {
  const { userRole } = useAppSelector((state) => state.appMain)

  if (!userRole) return <GuestIcons setSidebarOpen={setSidebarOpen} />

  return <UserIcons setSidebarOpen={setSidebarOpen} />
}

export default NavigationIcons
