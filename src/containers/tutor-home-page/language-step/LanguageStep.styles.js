import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    fontFamily: ['Rubik', '-apple-system', 'Arial', 'sans-serif'].join(','),
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    ...fadeAnimation
  },

  imgContainer: {
    display: 'flex',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0,
    height: '100%'
  },

  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  textBox: {
    fontSize: '16px',
    color: '#333'
  },

  formControl: {
    width: '100%'
  },

  buttonsBox: {
    mt: 'auto'
  },

  select: {
    maxHeight: 300,
    overflowY: 'auto'
  }
}
