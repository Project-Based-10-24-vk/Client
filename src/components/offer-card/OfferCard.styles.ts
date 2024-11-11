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
  },
  subjectContainer: {
    display: 'flex',
    gap: '10px'
  },
  subjectContainerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  subjectContainerLeftText: {
    color: 'primary.500',
    fontSize: '10px',
    lineHeight: '26px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase'
  },
  subjectContainerRight: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'start',
    gap: '4px'
  },
  subjectChip: {
    borderRadius: '10px',
    padding: '8px 4px',
    backgroundColor: 'rgba(121, 178, 96, 0.6)',

    span: {
      color: 'rgba(44, 69, 33, 1)',
      fontWeight: 500,
      fontSize: '10px',
      lineHeight: '15px',
      letterSpacing: '1.5px',
      textTransform: 'uppercase'
    }
  },
  levelChip: {
    borderRadius: '10px',
    padding: '8px 4px',
    backgroundColor: 'rgba(121, 178, 96, 0.2)',

    span: {
      color: 'primary.700',
      fontWeight: 400,
      fontSize: '10px',
      lineHeight: '15px',
      letterSpacing: '1.5px',
      textTransform: 'uppercase'
    }
  },
  bottomPart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  priceAndReview: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto'
  },
  price: {
    textAlign: 'left',
    position: 'static'
  },
  priceAmount: {
    fontSize: '20px',
    lineHeight: '28px',
    letterSpacing: '0.15px'
  },
  pricePeriod: {
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0.4px'
  },
  review: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    columnGap: '4px'
  },
  reviewMark: {
    display: 'flex',
    alignItems: 'center'
  },
  starIcon: {
    width: '1em',
    color: 'rgb(255, 176, 0)',
    fontSize: '1.5rem',
    height: '18px'
  },
  reviewMarkValue: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '28px',
    letterSpacing: '0.15px'
  },
  reviewAmount: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0.4px'
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }
}
