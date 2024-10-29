import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LanguageIcon from '@mui/icons-material/Language';
import testimg from './mockData/test.jpeg';
import { Typography, IconButton } from '@mui/material';
import { useState } from 'react';
import AppButton from '~/components/app-button/AppButton'
import { ButtonVariantEnum } from '~/types'
import { styles } from './cardLarge.styles';

import mockData from './mockData/cardsData';

const CardLarge = ({user}) => {
    
    const [value, setValue] = useState(0);

    user = mockData[0]

    return (
        <Box sx={styles.cardBody} elevation={24}>
            <Box sx={styles.userReview}>
                <Avatar sx={styles.avatar} alt="User avatar" src={user.avatar || testimg} />
                <Box sx={styles.raitinContainer}>
                    <Rating
                        sx={styles.ratingCard}
                        name="raiting-card"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        size="small"
                    />
                    <Typography>{value}</Typography>
                </Box>
                <Typography sx={styles.reviews}>
                    {user.reviews} reviews
                </Typography>
            </Box>
            <Box sx={styles.mainContent}>
                <Typography sx={styles.userName}>
                    {user.name}
                </Typography>
                <Typography sx={styles.userPosition}>
                    {user.position}
                </Typography>
                <Box sx={styles.courseDesc}>
                    <Typography sx={styles.region}>
                        {user.course.subject}
                    </Typography>
                    <Typography sx={styles.courseLevel}>
                        {user.course.level}
                    </Typography>
                </Box>
                <Typography sx={styles.description}>
                    {user.description}
                </Typography>
                <Box sx={styles.languages}>
                    <IconButton>
                        <LanguageIcon />
                    </IconButton>
                    {user.languages.map((language, index) => (
                        <Typography key={index}>
                            {language}{index < user.languages.length - 1 ? ', ' : ''}
                        </Typography>
                    ))}
                </Box>
            </Box>
            <Box sx={styles.details}>
                <Box display="flex" alignItems="center">
                    <Typography sx={styles.price}>{user.price}</Typography>
                    <Typography sx={styles.perHour}>{user.perHour}</Typography>
                    <IconButton sx={styles.bookmark}>
                        <BookmarkBorderIcon />
                    </IconButton>
                </Box>
                <AppButton sx={styles.button}>
                    Send message
                </AppButton>
                <AppButton
                    variant={ButtonVariantEnum.ContainedLight}
                    sx={styles.button}> 
                    Show details
                </AppButton>
            </Box>
        </Box>
    );
};

export default CardLarge;
