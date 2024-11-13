import { FC } from 'react'

import Box from '@mui/material/Box'
import AppCard from '~/components/app-card/AppCard'
import { styles } from '~/components/card-with-link/CardWithLink.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

interface CardWithLinkProps {
  img: string
  title: string
  description: string
  link: string
  color?: string
}

const CardWithLink: FC<CardWithLinkProps> = ({
  img,
  title,
  description,
  color = '#79B260',
  link
}) => {
  return (
    <AppCard link={link} sx={{ alignItems: 'center' }}>
      <Box height={64} mr={3} sx={{ position: 'relative' }} width={64}>
        <Box alt='item image' component='img' src={img} sx={styles.img} />
        <Box sx={{ ...styles.thumb, background: color }} />
      </Box>

      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
    </AppCard>
  )
}

export default CardWithLink
