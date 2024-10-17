import { Suspense, useLayoutEffect, useRef } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'

import Box from '@mui/material/Box'
import { styles } from '~/containers/app-content/AppContent.styles'
import AppBreadCrumbs from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs'
import Footer from '~/containers/layout/footer/Footer'
import Loader from '~/components/loader/Loader'
import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import { checkAuth } from '~/redux/reducer'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

const AppMain = () => {
  const mainWithFooter = useRef(null)
  const authCheckRef = useRef(false)
  const { loading } = useAppSelector((state) => state.appMain)
  const { state } = useNavigation()
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    !authCheckRef.current && void dispatch(checkAuth())

    return () => {
      authCheckRef.current = true
    }
  }, [dispatch])

  if (loading || state === 'loading') {
    return <Loader pageLoad />
  }

  return (
    <Box ref={mainWithFooter} sx={styles.content}>
      <Suspense fallback={<Loader pageLoad />}>
        <AppBreadCrumbs />
        <ScrollToTop element={mainWithFooter} />
        <Outlet context={{ pageRef: mainWithFooter }} />
        <ScrollToTopButton element={mainWithFooter} />
        <Footer />
      </Suspense>
    </Box>
  )
}

export default AppMain
