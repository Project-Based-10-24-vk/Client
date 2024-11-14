import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import FileUploader from '~/components/file-uploader/FileUploader'
import { useStepContext } from '~/context/step-context'
import { useCreateImgUrl } from '~/hooks/use-create-img-url'
import { ButtonVariantEnum } from '~/types'
import { validationData } from './constants'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [error, setError] = useState('')
  const { urls, createUrl } = useCreateImgUrl()
  const { handleStepData } = useStepContext()

  const handleFilesEmit = ({ files, error }) => {
    createUrl(files)

    setUploadedFiles(files)
    setError(error)
    handleStepData('photo', files, {})
  }

  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>
        {uploadedFiles.length ? (
          <Box component='img' src={urls} sx={style.img}></Box>
        ) : (
          <Box sx={style.uploadBox}>
            <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
          </Box>
        )}
      </Box>
      <Box sx={style.rigthBox}>
        <Box>
          <Typography sx={style.description}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <FileUploader
            buttonText={t('becomeTutor.photo.button')}
            emitter={handleFilesEmit}
            initialError={error}
            initialState={uploadedFiles}
            isImages
            sx={style.fileUploader}
            validationData={validationData}
            variant={ButtonVariantEnum.Contained}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
