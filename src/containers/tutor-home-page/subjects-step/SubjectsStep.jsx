import Box from '@mui/material/Box'
import CategoryDropdown from '~/containers/category-dropdown/CategoryDropdown'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'

const SubjectsStep = ({ btnsBox }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <CategoryDropdown />
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
