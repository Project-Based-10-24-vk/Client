export const styles = {
    cardBody: (theme) => ({
        display: 'flex',
        width: 'fit-content',
        height: 'fit-content',
        padding: '31px 30px',
        boxShadow: '0 0 10px 5px #90A4AE8F',
        borderRadius: '6px',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',

        [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        }
    }),

    //Left user review

    userReview: (theme) => ({
        flexGrow: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '20px',

        [theme.breakpoints.down('md')]: {
            alignItems: 'start'
        }
    }),

    avatar: {
        border: '2px solid #B0BEC5',
        width: '80px',
        height: '80px',
        marginBottom: '10px',
    },

    raitinContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100px',
        minWidth: '100px',
        height: '20px',
        padding: '4px',
        marginTop: '16px',
        backgroundColor: '#ECEFF1',
        borderRadius: '4px',
    },

    ratingCard: {
        marginRight: '3px',
    },

    reviews: {
        width: '100%',
        textAlign: 'start',
        marginTop: '10px',
        color: '#607D8B',
        fontSize: '12px',
    },


    //Main content
    mainContent: {
        flexGrow: 2,
        display: 'flex',
        flexDirection: 'column',
        maxWidth:'600px',
    },

    userName: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#37474F',
        mb: '10px',
    },

    userPosition: {
        fontSize: '14px',
        color: '#263238',
        lineHeight: '1.5',
        mb: '10px',
    },

    courseDesc: {
        mb: '10px',

        '& p': { 
            textTransform: 'uppercase',
        },
    },

    region: {
        display: 'inline-block',
        fontSize: '12px',
        color: '#455A64',
        backgroundColor: '#C1E1C1',
        borderRadius: '4px',
        padding: '4px 8px',
        marginRight: '8px',
    },

    courseLevel: {
        display: 'inline-block',
        fontSize: '12px',
        color: '#455A64',
        backgroundColor: '#D7E9D7',
        borderRadius: '4px',
        padding: '4px 8px',
    },

    description: {
        fontSize: '14px',
        color: '#546E7A',
        lineHeight: '20px',
        size:'14px',
        fontFamily:'Rubik'
    },

    languages: {
        marginTop: '10px',
        display: 'flex',
        alignItems:'center',

        p : {
            color:'#78909C'
        },

        svg : {
            color: '#78909C'
        }
    },

    // Right details
    details: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        borderTop: '1px solid #ECEFF1',
    },
    price: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#37474F',
    },
    perHour: {
        fontSize: '12px',
        color: '#607D8B',
    },
    bookmark: {
        marginLeft: '8px',
    },
    button: {
        color: '#FFFFFF',
        width: '100%',
        marginTop: '16px',
        '&:hover': {
            backgroundColor: '#37474F',
        },
    },
    
};
