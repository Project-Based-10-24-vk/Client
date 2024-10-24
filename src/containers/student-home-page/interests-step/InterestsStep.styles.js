import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
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
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  title: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '18.96px',
    letterSpacing: '0.15px'
  },
  optionsContainer: {
    flexGrow: 1
  },
  optionInputContainer: {
    mt: '20px'
  },
  option: {
    width: '100%'
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
  subjectsList: {
    display: 'flex',
    flexWrap: 'wrap',
    mt: '20px'
  },

  subjectItem: {
    width: 'fit-content',
    background: '#ECEFF1',
    borderRadius: '10px',
    ml: '4px',
    mt: '10px',
    height: '34px'
  }
}
