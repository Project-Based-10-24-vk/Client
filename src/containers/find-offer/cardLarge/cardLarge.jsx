import { useState } from 'react'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import LanguageIcon from '@mui/icons-material/Language'
import { IconButton, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import AppButton from '~/components/app-button/AppButton'
import { ButtonVariantEnum } from '~/types'
import { styles } from './cardLarge.styles'
import mockData from './mockData/cardsData'
import testimg from './mockData/test.jpeg'

const CardLarge = ({ user }) => {
  const [value, setValue] = useState(0)

  user = mockData[0]

  return (
    <Box elevation={24} sx={styles.cardBody}>
      <Box sx={styles.userReview}>
        <Avatar
          alt='User avatar'
          src={user.avatar || testimg}
          sx={styles.avatar}
        />
        <Box sx={styles.raitinContainer}>
          <Rating
            name='raiting-card'
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            size='small'
            sx={styles.ratingCard}
            value={value}
          />
          <Typography>{value}</Typography>
        </Box>
        <Typography sx={styles.reviews}>{user.reviews} reviews</Typography>
      </Box>
      <Box sx={styles.mainContent}>
        <Typography sx={styles.userName}>{user.name}</Typography>
        <Typography sx={styles.userPosition}>{user.position}</Typography>
        <Box sx={styles.courseDesc}>
          <Typography sx={styles.region}>{user.course.subject}</Typography>
          <Typography sx={styles.courseLevel}>{user.course.level}</Typography>
        </Box>
        <Typography sx={styles.description}>{user.description}</Typography>
        <Box sx={styles.languages}>
          <IconButton>
            <LanguageIcon />
          </IconButton>
          {user.languages.map((language, index) => (
            <Typography key={index}>
              {language}
              {index < user.languages.length - 1 ? ', ' : ''}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box sx={styles.details}>
        <Box alignItems='center' display='flex'>
          <Typography sx={styles.price}>{user.price}</Typography>
          <Typography sx={styles.perHour}>{user.perHour}</Typography>
          <IconButton sx={styles.bookmark}>
            <BookmarkBorderIcon />
          </IconButton>
        </Box>
        <AppButton sx={styles.button}>Send message</AppButton>
        <AppButton
          sx={styles.button}
          variant={ButtonVariantEnum.ContainedLight}
        >
          Show details
        </AppButton>
      </Box>
    </Box>
  )
}

export default CardLarge
