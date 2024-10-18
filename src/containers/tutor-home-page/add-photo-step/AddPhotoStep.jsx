import { Box } from '@mui/material'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import FileUploader from '~/components/file-uploader/FileUploader'

const AddPhotoStep = ({ btnsBox }) => {
  return (
    <Box sx={style.root}>
      AddPhoto step
      <FileUploader buttonText='add photo' />
      {btnsBox}
    </Box>
  )
}

export default AddPhotoStep
