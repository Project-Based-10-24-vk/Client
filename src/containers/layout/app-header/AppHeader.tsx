import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { styles } from '~/containers/layout/app-header/AppHeader.styles'
import NavBar from '~/containers/layout/navbar/NavBar'

const AppHeader = () => {
  return (
    <>
      <AppBar sx={styles.appBar}>
        <NavBar />
      </AppBar>
      <Toolbar data-testid='toolbar' sx={styles.toolBar} />
    </>
  )
}

export default AppHeader
