import {
  slidesLeftAnimation,
  slidesRightAnimation
} from '~/styles/app-theme/custom-animations'

const side = {
  box: {
    display: 'flex',
    alignItems: 'flex-start',
    maxWidth: '1120px',
    width: '100%',
    flexDirection: { sm: 'row-reverse', xs: 'row' },
    '&.MuiBox-root:last-of-type .dots': {
      display: { xs: 'none', sm: 'block' }
    }
  },
  clearBox: {
    display: { xs: 'none', sm: 'flex' },
    flex: 1
  },
  wrapper: {
    pt: '5px',
    flex: 1,
    textAlign: { xs: 'start', sm: 'end' }
  },
  title: {
    typography: { xs: 'h6' },
    marginBottom: '8px'
  },
  description: {
    typography: { xs: 'body2' }
  }
}

export const styles = {
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    m: { sm: '0px 60px', xs: '0px 20px' }
  },
  button: {
    mt: '40px',
    minWidth: '230px',
    allignSelf: 'center'
  },
  left: {
    ...side,
    slidesIn: slidesRightAnimation
  },
  right: {
    box: {
      ...side.box,
      flexDirection: 'row'
    },
    clearBox: side.clearBox,
    wrapper: { ...side.wrapper, textAlign: 'start' },
    title: side.title,
    description: side.description,
    slidesIn: slidesLeftAnimation
  }
}
