import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import FileUploader from '~/components/file-uploader/FileUploader'
import { ButtonVariantEnum } from '~/types'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()

  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>
        <Box sx={style.uploadBox}>
          <Typography>Photo preview</Typography>
        </Box>
      </Box>
      <Box sx={style.rigthBox}>
        <Box>
          <Typography sx={style.description}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <FileUploader
            buttonText={t('becomeTutor.photo.button')}
            isImages
            sx={style.fileUploader}
            variant={ButtonVariantEnum.Contained}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
