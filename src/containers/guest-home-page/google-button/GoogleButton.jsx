import { useCallback, useEffect } from 'react'
import { useHref } from 'react-router-dom'

import { styles } from '~/containers/guest-home-page/google-button/GoogleButton.styles'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { scrollToHash } from '~/utils/hash-scroll'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useGoogleAuthMutation } from '~/services/auth-service'
import { snackbarVariants } from '~/constants'

const GoogleButton = ({ role, route, buttonWidth, type }) => {
  const ref = useHref(route)
  const mediaQuery = useBreakpoints().isLaptopAndAbove ? 'md' : 'xs'
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [googleAuth] = useGoogleAuthMutation()

  const handleCredentialResponse = useCallback(
    async (token) => {
      try {
        await googleAuth({ token, role }).unwrap()
        closeModal()
      } catch (e) {
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${e.data.code}`
        })
        if (e.data.code === 'USER_NOT_FOUND') {
          closeModal()
          scrollToHash(ref)
        }
      }
    },
    [googleAuth, role, closeModal, setAlert, ref]
  )

  useEffect(() => {
    const googleId = window.google.accounts.id

    googleId.initialize({
      client_id: import.meta.env.VITE_GMAIL_CLIENT_ID,
      callback: handleCredentialResponse
    })

    googleId.renderButton(document.getElementById('googleButton'), {
      size: 'large',
      width: buttonWidth[mediaQuery],
      locale: 'en',
      text: `${type}_with`
    })
  }, [handleCredentialResponse, buttonWidth, type, mediaQuery])

  return <div id='googleButton' style={styles.google} />
}

export default GoogleButton
