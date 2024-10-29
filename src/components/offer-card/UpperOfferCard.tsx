import { Link } from 'react-router-dom'

import { Language } from '@mui/icons-material'
import { Avatar, Box, Typography } from '@mui/material'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from './OfferCard.styles'

export const UpperOfferCard = () => {
  return (
    <Box sx={styles.upperPart}>
      <Box sx={styles.userInfoContainer}>
        <Link to={authRoutes.userProfile.route}>
          <Avatar src='' sx={styles.avatar} />
        </Link>
        <Box sx={styles.userInfo}>
          <Link
            style={{ textDecoration: 'none' }}
            to={authRoutes.userProfile.route}
          >
            <Typography sx={styles.userName}>Some Name</Typography>
          </Link>
          <Box sx={styles.userLanguage}>
            <Language sx={styles.languageIcon} />
            <Typography sx={styles.languageName}>Ukrainian</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
