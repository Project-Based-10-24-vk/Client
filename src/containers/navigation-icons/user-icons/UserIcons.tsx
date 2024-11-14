import { FC, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { useAppSelector } from '~/hooks/use-redux'
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box'
import AccountMenu from '~/containers/layout/account-menu/AccountMenu'
import { userIcons } from '~/containers/navigation-icons/NavigationIcons.constants'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'
import NavigationIcon from '~/components/navigation-icon/NavigationIcon'

interface UserIconsProps {
  setSidebarOpen: () => void
}

const UserIcons: FC<UserIconsProps> = ({ setSidebarOpen }) => {

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const { userFirstName, userLastName, userPhoto } = useAppSelector((state) => state.appMain)
  
  const avatarUrl = userPhoto || `${userFirstName?.charAt(0) || ''}${userLastName?.charAt(0) || ''}`;

  const anchorRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

  const openMenu = () => setMenuAnchorEl(anchorRef.current)
  const closeMenu = () => setMenuAnchorEl(null)
  const openNotifications = () => anchorRef.current

  
  const foundItem = userIcons.find(item => item.tooltip === 'iconsTooltip.account');

  if (foundItem) {
    foundItem.icon = avatarUrl ? (
      <Avatar alt="User Avatar" src={avatarUrl} style={styles.userProfileImage} />
    ) : (
      <Avatar style={styles.userProfileImage}>{avatarUrl}</Avatar>
    );
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