import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, matchPath, useLocation } from 'react-router-dom'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/layout/navbar/NavBar.styles'
import Sidebar from '~/containers/layout/sidebar/Sidebar'
import Logo from '~/containers/logo/Logo'
import NavigationIcons from '~/containers/navigation-icons/NavigationIcons'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import HashLink from '~/components/hash-link/HashLink'
import { authRoutes } from '~/router/constants/authRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import {
  findOffersChildRoutes,
  tutorRoutes
} from '~/router/constants/tutorRoutes'
import { useDrawer } from '~/hooks/use-drawer'
import useMenu from '~/hooks/use-menu'
import { useAppSelector } from '~/hooks/use-redux'
import { SizeEnum, UserRoleEnum } from '~/types'

const Navbar = () => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { openMenu, renderMenu, closeMenu, anchorEl } = useMenu()
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const isChildRouteActive = findOffersChildRoutes.some((childRoute) =>
    Boolean(matchPath(childRoute.path, pathname))
  )

  const navigationItems = useMemo(() => {
    if (userRole === UserRoleEnum.Student) {
      return Object.values(studentRoutes.navBar)
    } else if (userRole === UserRoleEnum.Tutor) {
      return Object.values(tutorRoutes.navBar)
    }
    return Object.values(guestRoutes.navBar)
  }, [userRole])

  const accountItems = useMemo(() => {
    if (!userRole) return []
    return Object.values(authRoutes.accountMenu)
  }, [userRole])

  const handleOpenSidebar = () => {
    openDrawer()
  }

  const findOffersMenu = findOffersChildRoutes.map((childRoute) => (
    <MenuItem
      component={Link}
      key={childRoute.route}
      onClick={closeMenu}
      sx={styles.findOfferMenuItem}
      to={childRoute.path}
    >
      {t(`header.${childRoute.route}`)}
    </MenuItem>
  ))

  const navigationList = navigationItems.map((item, idx, array) => {
    const isLast = array.length - 1 === idx
    const isActive = Boolean(matchPath(item.path, pathname))

    return (
      <Fragment key={item.route}>
        {item.route === tutorRoutes.navBar.findOffers.route ? (
          <ListItem onClick={openMenu} sx={styles.listItem}>
            <Typography sx={styles.navItemText(isChildRouteActive)}>
              {t(`header.${item.route}`)}
            </Typography>
            <KeyboardArrowDownIcon sx={styles.arrowIcon(Boolean(anchorEl))} />
          </ListItem>
        ) : (
          <ListItem>
            <Typography
              component={HashLink}
              sx={styles.navItemText(isActive)}
              to={item.path}
            >
              {t(`header.${item.route}`)}
            </Typography>
          </ListItem>
        )}
        {!isLast && <Typography sx={styles.divider}>{'/'}</Typography>}
      </Fragment>
    )
  })

  const scrollToWelcome = (): void => {
    const welcome = document.getElementById(guestRoutes.welcome.route)
    if (welcome) welcome.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box sx={styles.header}>
      <Button
        component={Link}
        onClick={scrollToWelcome}
        size={SizeEnum.Small}
        sx={styles.logoButton}
        to={guestRoutes.home.path}
      >
        <Logo />
      </Button>
      {renderMenu(findOffersMenu, { autoFocus: false })}
      <List sx={styles.navList}>{navigationList}</List>
      <NavigationIcons setSidebarOpen={handleOpenSidebar} />
      <AppDrawer onClose={closeDrawer} open={isOpen}>
        <Sidebar
          accountItems={accountItems}
          navigationItems={navigationItems}
          onClose={closeDrawer}
        />
      </AppDrawer>
    </Box>
  )
}

export default Navbar
