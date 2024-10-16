import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton, ListItem, ListItemText } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { styles } from '~/containers/student-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/student-home-page/become-student/subject-step.svg'
import { categoriesMock, languagesMock } from './constants'

interface SubjectsStepProps {
  btnsBox: React.ReactNode
}

const SubjectsStep: React.FC<SubjectsStepProps> = ({ btnsBox }) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedSubjectList, setSelectedSubjectList] = useState<string[]>([])

  const onHandleAddMoreSubjectClick = () => {
    if (selectedSubject === null) {
      return
    }

    if (selectedSubjectList.includes(selectedSubject)) {
      return
    }
    setSelectedSubjectList([...selectedSubjectList, selectedSubject])
  }

  const onHandleDelete = (item: string) => {
    setSelectedSubjectList(selectedSubjectList.filter((el) => el !== item))
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
              options={categoriesMock.map((option) => option.name)}
              renderInput={(params) => (
                <TextField {...params} label='Study Category' />
              )}
              sx={styles.option}
            />
          </Box>
          <Box sx={styles.optionInputContainer}>
            <Autocomplete
              disablePortal
              onChange={(event, value) => setSelectedSubject(value)}
              options={languagesMock.map((option) => option.name)}
              renderInput={(params) => (
                <TextField {...params} label='Subject' />
              )}
              sx={styles.option}
            />
          </Box>
          <Button
            onClick={onHandleAddMoreSubjectClick}
            sx={styles.addMoreSubjectButton}
            variant='contained'
          >
            Add one more subject
          </Button>
          <CustomListItem items={selectedSubjectList} />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
