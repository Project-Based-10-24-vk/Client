import { Box } from '@mui/material'
import AppCard from '../app-card/AppCard'
import { BottomOfferCard } from './BottomOfferCard'
import { styles } from './OfferCard.styles'
import { UpperOfferCard } from './UpperOfferCard'

export const OfferCard = () => {
  return (
    <AppCard sx={styles.cardContainer}>
      <Box sx={styles.card}>
        <UpperOfferCard />
        <BottomOfferCard />
      </Box>
    </AppCard>
  )
}
