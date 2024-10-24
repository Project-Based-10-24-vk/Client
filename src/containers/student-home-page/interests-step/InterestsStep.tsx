import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton, ListItem, ListItemText } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import img from '~/assets/img/student-home-page/become-student/interests-step.svg'
import { studyCategoryMock, subjectMock } from './constants'
import { styles } from './InterestsStep.styles'

interface InterestsProps {
  btnsBox: React.ReactNode
}

const Interests: React.FC<InterestsProps> = ({ btnsBox }) => {
  const [selectedInterest, setselectedInterest] = useState<string | null>(null)
  const [selectedInterestList, setselectedInterestList] = useState<string[]>([])

  const onHandleAddMoreSubjectClick = () => {
    if (selectedInterest === null) {
      return
    }

    if (selectedInterestList.includes(selectedInterest)) {
      return
    }
    setselectedInterestList([...selectedInterestList, selectedInterest])
  }

  const onHandleDelete = (item: string) => {
    setselectedInterestList(selectedInterestList.filter((el) => el !== item))
  }

  const CustomListItem: React.FC<ListItemProps> = ({ items }) => {
    return (
      <Box sx={styles.subjectsList}>
        {items.map((item) => (
          <ListItem key={item} sx={styles.subjectItem}>
            <ListItemText primary={item} />
            <IconButton aria-label='delete' edge='end' onClick={() => {}}>
              <CloseIcon onClick={() => onHandleDelete(item)} />
            </IconButton>
          </ListItem>
        ))}
      </Box>
    )
  }

  interface ListItemProps {
    items: string[]
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box sx={styles.title}>
          Velit officia consequat duis enim velit mollit. Other categories you
          can add in your account settings later.
        </Box>
        <Box sx={styles.optionsContainer}>
          <Box sx={styles.optionInputContainer}>
            <Autocomplete
              disablePortal
              options={studyCategoryMock.map((option) => option.study_category)}
              renderInput={(params) => (
                <TextField {...params} label='Study Category' />
              )}
              sx={styles.option}
            />
          </Box>
          <Box sx={styles.optionInputContainer}>
            <Autocomplete
              disablePortal
              onChange={(event, value) => setselectedInterest(value)}
              options={subjectMock.map((option) => option.subject)}
              renderInput={(params) => (
                <TextField {...params} label='Subject' />
              )}
              sx={styles.option}
            />
          </Box>
          <Button
            onClick={onHandleAddMoreSubjectClick}
            sx={styles.addMoreSubjectButton}
          >
            Add one more subject
          </Button>
          <CustomListItem items={selectedInterestList} />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default Interests
