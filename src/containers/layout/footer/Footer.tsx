import Box from '@mui/material/Box'
import { styles } from '~/containers/layout/footer/Footer.styles'
import GuestFooter from '~/containers/layout/footer/guest-footer/GuestFooter'
import UserFooter from '~/containers/layout/footer/user-footer/UserFooter'
import { useAppSelector } from '~/hooks/use-redux'
import { ComponentEnum } from '~/types'

const Footer = () => {
  const { userRole, pageLoad } = useAppSelector((state) => state.appMain)

  return (
    <Box component={ComponentEnum.Footer} sx={styles.footer}>
      {!pageLoad && (userRole ? <UserFooter /> : <GuestFooter />)}
    </Box>
  )
}

export default Footer
