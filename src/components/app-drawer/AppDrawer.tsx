import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import CloseRounded from '@mui/icons-material/CloseRounded'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { styles } from '~/components/app-drawer/AppDrawer.styles'
import useConfirm from '~/hooks/use-confirm'

interface AppDrawerProps extends DrawerProps {
  children: ReactNode
  closeIcon?: boolean
  onClose: () => void
}

const AppDrawer: FC<AppDrawerProps> = ({
  children,
  onClose,
  anchor = 'right',
  closeIcon = true,
  ...props
}) => {
  const { t } = useTranslation()

  const { checkConfirmation } = useConfirm()

  const handleCloseDrawer = async () => {
    const confirmed = checkConfirmation({
      message: 'questions.discardChanges',
      title: 'titles.discardOffer',
      confirmButton: t('common.discard'),
      cancelButton: t('common.cancel')
    })
    if (await confirmed) {
      onClose()
    }
  }

  return (
    <Drawer
      PaperProps={{ sx: styles.root }}
      anchor={anchor}
      onClose={() => void handleCloseDrawer()}
      {...props}
    >
      {closeIcon && (
        <IconButton
          onClick={() => void handleCloseDrawer()}
          sx={styles.closeButton}
        >
          <CloseRounded sx={styles.closeIcon} />
        </IconButton>
      )}
      {children}
    </Drawer>
  )
}

export default AppDrawer
