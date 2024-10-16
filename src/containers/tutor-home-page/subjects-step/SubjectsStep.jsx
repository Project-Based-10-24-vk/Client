import Box from '@mui/material/Box'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import { SubjectStepSelect } from '~/components/subject-step-select/SubjectStepSelect'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'

const SubjectsStep = ({ btnsBox }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <SubjectStepSelect />
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
