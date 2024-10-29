import { Box } from '@mui/material'
import AppCard from '../app-card/AppCard'
import { styles } from './OfferCard.styles'
import { UpperOfferCard } from './UpperOfferCard'

export const OfferCard = () => {
  return (
    <AppCard sx={styles.cardContainer}>
      <Box sx={styles.card}>
        <UpperOfferCard />
      </Box>
    </AppCard>
  )
}
