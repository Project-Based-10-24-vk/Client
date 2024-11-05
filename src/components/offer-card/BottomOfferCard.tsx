import { Star } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { ButtonVariantEnum } from '~/types'
import AppButton from '../app-button/AppButton'
import { styles } from './OfferCard.styles'

export const BottomOfferCard = () => {
  const handleDetailsClick = () => {
    console.log('details')
  }

  const handleSendMessageClick = () => {
    console.log('message')
  }

  return (
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
}
