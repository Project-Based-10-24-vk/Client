import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'

const SubjectsStep = ({ btnsBox }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleCategoryChange = useCallback((event, category) => {
    setSelectedCategory(category)
    setSelectedSubject(null)
  }, [])

  const handleSubjectChange = useCallback((event, subject) => {
    setSelectedSubject(subject)
  }, [])

  const fetchSubjects = useCallback(() => {
    if (selectedCategory) {
      return subjectService.getSubjects(null, selectedCategory._id)
    }
    return []
  }, [selectedCategory])

  const handleAddItem = () => {
    if (selectedSubject) {
      if (selectedItems.some((item) => item._id === selectedSubject._id)) {
        setError(t('becomeTutor.categories.sameSubject'))
      } else {
        setSelectedItems((prevItems) => [...prevItems, selectedSubject])
        setSelectedSubject(null)
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
          <AsyncAutocomplete
            labelField='name'
            onChange={handleCategoryChange}
            service={categoryService.getCategories}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={selectedCategory}
          />

          <AsyncAutocomplete
            disabled={!selectedCategory}
            fetchCondition={!!selectedCategory}
            labelField='name'
            onChange={handleSubjectChange}
            service={fetchSubjects}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
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
