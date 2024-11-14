import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    margin: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '50px',
    height: { sm: '485px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: { sm: 'none', xs: 'none', md: 'flex' },
    flex: 1,
    maxWidth: '432px',
    aspectRatio: { xs: '4/3', sm: 'auto' },
    pb: { xs: '16px', sm: '52px' }
  },
  img: {
    width: '100%',
    m: { sm: 0, xs: '0 auto' }
  },
  rigthBox: {
    maxWidth: '432px',
    // display: 'flex',
    // flexDirection: 'column',
    // // justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  form: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: '0', sm: '16px' },
    mb: '5px'
  },
  textblock: {
    mb: '16px'
  }
}
