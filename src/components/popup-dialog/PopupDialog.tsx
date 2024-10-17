import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import CloseIcon from '@mui/icons-material/Close'
import { PaperProps } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'
import { useModalContext } from '~/context/modal-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import useConfirm from '~/hooks/use-confirm'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: PaperProps
  timerId: NodeJS.Timeout | null
  closeModalAfterDelay: (delay?: number) => void
}

const PopupDialog: FC<PopupDialogProps> = ({
  content,
  paperProps,
  timerId,
  closeModalAfterDelay
}) => {
  const { isMobile } = useBreakpoints()
  const { closeModal } = useModalContext()
  const { openDialog, needConfirmation } = useConfirm()
  const { t } = useTranslation()

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()

  const handleClose = () => {
    needConfirmation
      ? openDialog({
          sendConfirm: (confirmed: boolean) => {
            if (confirmed) {
              closeModal()
            }
          },
          title: t('titles.confirmTitle'),
          message: t('questions.unsavedChanges'),
          confirmButton: t('common.yes'),
          cancelButton: t('common.no')
        })
      : closeModal()
  }

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        <IconButton onClick={handleClose} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
      </Box>
    </Dialog>
  )
}

export default PopupDialog
