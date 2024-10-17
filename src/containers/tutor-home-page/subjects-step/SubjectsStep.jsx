import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import CategoryDropdown from '~/containers/category-dropdown/CategoryDropdown'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        {t('becomeTutor.categories.title')}
        <CategoryDropdown
          label={t('becomeTutor.categories.mainSubjectsLabel')}
        />
        <Box sx={styles.btnsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
