import { Link } from 'react-router-dom'

import { Language, Star, TurnedInNot } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Typography
} from '@mui/material'
import { authRoutes } from '~/router/constants/authRoutes'
import { ButtonVariantEnum } from '~/types'
import AppButton from '../app-button/AppButton'
import AppCard from '../app-card/AppCard'
import { styles } from './OfferCard.styles'

export const OfferCard = () => {
  const handleDetailsClick = () => {
    console.log('details')
  }

  const handleSendMessageClick = () => {
    console.log('message')
  }

  const UpperOfferCard = () => (
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
      <Typography sx={styles.subject}>Test</Typography>
      <Divider />
      <IconButton sx={styles.addIcon}>
        <TurnedInNot />
      </IconButton>
      <Box sx={styles.subjectContainer}>
        <Box sx={styles.subjectContainerLeft}>
          <Typography sx={styles.subjectContainerLeftText}>Subject:</Typography>
          <Typography sx={styles.subjectContainerLeftText}>Level:</Typography>
        </Box>
        <Box sx={styles.subjectContainerRight}>
          <Chip label='Operational audit' sx={styles.subjectChip} />
          <Chip label='advanced' sx={styles.levelChip} />
        </Box>
      </Box>
    </Box>
  )

  const BottomOfferCard = () => (
    <Box sx={styles.bottomPart}>
      <Box sx={styles.priceAndReview}>
        <Box sx={styles.price}>
          <Typography sx={styles.priceAmount}>1000 UAH</Typography>
          <Typography sx={styles.pricePeriod}>/ HOUR</Typography>
        </Box>
        <Box sx={styles.review}>
          <Box sx={styles.reviewMark}>
            <Star sx={styles.starIcon} />
            <Typography sx={styles.reviewMarkValue}>0</Typography>
          </Box>
          <Typography sx={styles.reviewAmount}>0 reviews</Typography>
        </Box>
      </Box>
      <Box sx={styles.buttonsContainer}>
        <AppButton onClick={handleDetailsClick}>View Details</AppButton>
        <AppButton
          onClick={handleSendMessageClick}
          variant={ButtonVariantEnum.Tonal}
        >
          Send Message
        </AppButton>
      </Box>
    </Box>
  )
  return (
    <AppCard sx={styles.cardContainer}>
      <Box sx={styles.card}>
        <UpperOfferCard />
        <BottomOfferCard />
      </Box>
    </AppCard>
  )
}
