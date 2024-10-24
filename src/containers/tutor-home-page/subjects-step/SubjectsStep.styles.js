import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
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
    fontFamily: ['Rubik', '-apple-system', 'Arial', 'sans-serif'].join(','),
    display: 'flex',
    flex: 1,
    maxWidth: '432px',
    flexDirection: 'column',
    gap: '20px',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },

  selectsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  addMoreSubjectButton: {
    background: '#ECEFF1',
    color: '#263238',
    width: '100%',
    height: '48px',
    mt: '16px',
    '&:hover': {
      background: '##263238',
      color: '##ECEFF1'
    }
  },
  btnsBox: {
    mt: 'auto'
  }
}
