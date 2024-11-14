import { useState } from 'react'

import { Grid } from '@mui/material'
import { OfferCard } from '~/components/offer-card/OfferCard'
import ViewModeToggle from '~/components/view-mode-toggle/ViewModeToggle'
import CardLarge from '../find-offer/cardLarge/cardLarge'

type ViewMode = 'list' | 'grid'

const OffersList: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  return (
    <div>
      <ViewModeToggle setViewMode={setViewMode} viewMode={viewMode} />

      <Grid columnSpacing={1} container rowSpacing={4}>
        {viewMode === 'list'
          ? Array.from({ length: 4 }).map((_, index) => (
              <Grid item key={index} xs={12}>
                <CardLarge user={''} />
              </Grid>
            ))
          : Array.from({ length: 9 }).map((_, index) => (
              <Grid item key={index} xs={4}>
                <OfferCard />
              </Grid>
            ))}
      </Grid>
    </div>
  )
}

export default OffersList
