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
}

const CardWithLink: FC<CardWithLinkProps> = ({
  img,
  title,
  description,
  link
}) => {
  return (
    <AppCard link={link}>
      <Box alt='item image' component='img' src={img} sx={styles.img} />
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
    </AppCard>
  )
}

export default CardWithLink
