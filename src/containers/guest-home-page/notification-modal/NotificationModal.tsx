import { FC, ReactElement } from 'react'

import { Box } from '@mui/material'
import { styles } from '~/containers/guest-home-page/notification-modal/NotificationModal.styles'
import AppButton from '~/components/app-button/AppButton'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

interface ConfirmEmailModal {
  description: string | ReactElement
  buttonTitle: string
  title: string
  img: string
  onClose: () => void
}

const NotificationModal: FC<ConfirmEmailModal> = ({
  description,
  buttonTitle,
  title,
  img,
  onClose
}) => {
  return (
    <Box sx={styles.root}>
      <ImgTitleDescription
        description={description}
        img={img}
        style={styles.imgTitleDesc}
        title={title}
      />
      <AppButton onClick={onClose}>{buttonTitle}</AppButton>
    </Box>
  )
}

export default NotificationModal
