import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppSelect from '~/components/app-select/AppSelect'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { categoriesMock, languagesMock } from './constants'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()

  const fieldsCategories = categoriesMock.map((category) => ({
    title: category.name,
    value: category.name
  }))

  const fieldsSubjects = languagesMock.map((category) => ({
    title: category.name,
    value: category.name
  }))

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [error, setError] = useState('')

  const handleAddItem = () => {
    if (selectedSubject) {
      if (selectedItems.includes(selectedSubject)) {
        setError(t('becomeTutor.categories.sameSubject'))
      } else {
        setSelectedItems((prevItems) => [...prevItems, selectedSubject])
        setSelectedSubject('')
        setError('')
      }
    }
  }

  const handleChipDelete = (item) => {
    setSelectedItems((prevItems) => prevItems.filter((i) => i !== item))
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        {t('becomeTutor.categories.title')}
        <Box sx={styles.selectsBox}>
          <AppSelect
            fields={fieldsCategories}
            label={t('becomeTutor.categories.mainSubjectsLabel')}
            setValue={setSelectedCategory}
            value={selectedCategory}
          />

          <AppSelect
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 250
                }
              }
            }}
            fields={fieldsSubjects}
            label={t('becomeTutor.categories.subjectLabel')}
            setValue={setSelectedSubject}
            value={selectedSubject}
          />
        </Box>

        <Button onClick={handleAddItem} sx={styles.addMoreSubjectButton}>
          {t('becomeTutor.categories.btnText')}
        </Button>

        {error && (
          <Typography sx={{ color: 'red', marginTop: '10px' }}>
            {error}
          </Typography>
        )}

        <AppChipList
          defaultQuantity={4}
          handleChipDelete={handleChipDelete}
          items={selectedItems}
        />

        <Box sx={styles.btnsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
