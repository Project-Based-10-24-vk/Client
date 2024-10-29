export const styles = {
  cardContainer: {
    width: '360px',
    padding: '24px 20px'
  },
  card: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    justifyContent: 'space-between'
  },
  upperPart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    alignItems: 'center'
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    height: '100px',
    width: '100px'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  userName: {
    fontWeight: 500,
    color: 'primary.500'
  },
  userLanguage: {
    display: 'flex',
    gap: '8px',
    marginTop: '4px',
    marginBottom: '4px',
    color: 'primary.400'
  },

  languageIcon: {
    width: '20px',
    height: '20px',
    display: 'inine-block',
    fill: 'currentColor'
  },
  languageName: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.0025em'
  },
  subject: {
    fontSize: '18px',
    fontWeight: 600,
    wordBreak: 'break-word',
    overflow: 'hidden',
    color: 'primary.700'
  },
  addIcon: {
    cursor: 'pointer',
    display: 'inline-flex',
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    color: 'basic.black'
  }
}
