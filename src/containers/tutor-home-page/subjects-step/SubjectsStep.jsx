import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'

const SubjectsStep = ({ btnsBox, stepLabel }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const { stepData, handleStepData } = useStepContext()
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleCategoryChange = useCallback((event, category) => {
    setSelectedCategory(category)
    setSelectedSubject(null)
  }, [])

  const handleSubjectChange = useCallback((event, subject) => {
    setSelectedSubject(subject)
  }, [])

  const fetchSubjects = useCallback(async () => {
    if (selectedCategory) {
      return await subjectService.getSubjects(null, selectedCategory._id)
    }
    return []
  }, [selectedCategory])

  const handleAddItem = () => {
    if (selectedSubject) {
      if (
        stepData[stepLabel].some((item) => item._id === selectedSubject._id)
      ) {
        setError(t('becomeTutor.categories.sameSubject'))
      } else {
        setSelectedSubject(null)
        setError('')
        handleStepData(
          stepLabel,
          [
            ...stepData[stepLabel],
            { id: selectedSubject._id, name: selectedSubject.name }
          ],
          {}
        )
      }
    }
  }

  const handleChipDelete = (item) => {
    handleStepData(
      stepLabel,
      stepData[stepLabel].filter((subj) => {
        return subj.name !== item
      }),
      {}
    )
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
            axiosProps={{ transform: (data) => data.items }}
            labelField='name'
            onChange={handleCategoryChange}
            service={categoryService.getCategoriesNames}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={selectedCategory}
          />

          <AsyncAutocomplete
            axiosProps={{ transform: (data) => data.items }}
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
          items={stepData[stepLabel].map((subj) => `${subj.name}`)}
        />

        <Box sx={styles.btnsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
