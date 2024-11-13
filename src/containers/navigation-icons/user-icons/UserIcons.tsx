import { FC, useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import AccountMenu from '~/containers/layout/account-menu/AccountMenu'
import { userIcons } from '~/containers/navigation-icons/NavigationIcons.constants'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'
import NavigationIcon from '~/components/navigation-icon/NavigationIcon'
import { useAppSelector } from '~/hooks/use-redux'

interface UserIconsProps {
  setSidebarOpen: () => void
}

const UserIcons: FC<UserIconsProps> = ({ setSidebarOpen }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const state = useAppSelector((state) => state.appMain)

  const { userFirstName, userLastName } = useAppSelector(
    (state) => state.appMain
  )

  const initials = `${userFirstName?.charAt(0)}${userLastName?.charAt(0)}`

  const anchorRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

  const openMenu = () => setMenuAnchorEl(anchorRef.current)
  const closeMenu = () => setMenuAnchorEl(null)
  const openNotifications = () => anchorRef.current

  //Temp avatar rand
  function getRandomAvatarUrl() {
    const urls = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYEzHEIyNnwOi8OeeGt-FDPXAWmPpu6-zVI1GAeuZoC9gEwmhwlQZlpIPq7nxEZ6w3WAg&usqp=CAU',
      null
    ]

    return urls[Math.floor(Math.random() * urls.length)]
  }

  const avatarUrl = getRandomAvatarUrl()

  const foundItem = userIcons.find(
    (item) => item.tooltip === 'iconsTooltip.account'
  )

  if (foundItem) {
    foundItem.icon = avatarUrl ? (
      <Avatar
        alt='User Avatar'
        src={avatarUrl}
        style={styles.userProfileImage}
      />
    ) : (
      <Avatar style={styles.userProfileImage}>{initials}</Avatar>
    )
  }

  const icons = userIcons.map(
    (item) =>
      !item.disabled && (
        <NavigationIcon
          badgeContent={item.badgeContent?.({
            notifications: 1
          })}
          buttonProps={item.buttonProps({
            openMenu,
            openNotifications,
            setSidebarOpen
          })}
          icon={item.icon}
          key={item.tooltip}
          tooltip={t(item.tooltip)}
        />
      )
  )

  return (
    <Box ref={anchorRef} sx={styles.iconBox}>
      {icons}
      <AccountMenu anchorEl={menuAnchorEl} onClose={closeMenu} />
    </Box>
  )
}

export default UserIcons
