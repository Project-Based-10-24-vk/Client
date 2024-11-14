export const styles = {
  thumb: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '64px',
    height: '64px',
    borderRadius: '6px',
    opacity: 0.2
  },
  img: {
    alignSelf: 'center',
    // mr: '24px',
    width: '32px',
    height: '32px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10
  },
  titleWithDescription: {
    wrapper: {
      minWidth: '110px',
      margin: 0,
      mb: 0,
      lineHeight: '24px',
      textAlign: 'start',
      alignSelf: 'center'
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'basic.black',
      typography: { xs: 'h6' },
      m: 0
    },
    description: {
      typography: { xs: 'body2' },
      color: 'primary.500'
    }
  }
}
