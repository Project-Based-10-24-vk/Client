import { useTranslation } from 'react-i18next'

import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/layout/footer/user-footer/UserFooter.styles'
import Logo from '~/containers/logo/Logo'
import HashLink from '~/components/hash-link/HashLink'
import { guestRoutes } from '~/router/constants/guestRoutes'
import useBreakpoints from '~/hooks/use-breakpoints'

const UserFooter = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const socialLinks = (
    <Box sx={styles.socialLinks}>
      <Link sx={styles.socialLink} target='_blank'>
        <FacebookIcon />
      </Link>
      <Link sx={styles.socialLink} target='_blank'>
        <InstagramIcon />
      </Link>
    </Box>
  )

  const logo = (
    <Link component={HashLink} to={guestRoutes.home.path}>
      <Logo light sx={styles.logo} />
    </Link>
  )

  return (
    <Container sx={styles.root}>
      {!isMobile && logo}
      {isMobile && (
        <Box sx={styles.linksWrapper}>
          {logo}
          {socialLinks}
        </Box>
      )}
      {isMobile && <Divider sx={styles.divider} />}
      <Typography sx={styles.copyRight}>
        {t('footer.allRightsReserved')}
      </Typography>
      {!isMobile && socialLinks}
    </Container>
  )
}

export default UserFooter
