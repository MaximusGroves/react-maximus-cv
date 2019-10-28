import { createMuiTheme } from '@material-ui/core/styles';

/**
 * Documentation on customizing the global theme can be found here:
 * https://material-ui-next.com/customization/themes/
 *
 * The entire default theme can be found here:
 * https://material-ui-next.com/customization/default-theme/
 */

const gtGold = '#B3A369';

const defaultTheme = createMuiTheme();
const theme = (groupTheme) =>
  createMuiTheme({


    /**
     *
     * Sample styling code for the group table
     *    field names must have quotation marks
     *    no single quotes
     *    no extra comma at last object entry
     *
     * { "primary" : { "main" : "#0070c0" , "light" : "#4597D1" , "dark" : "#00487B" , "contrast" : "#002424" , "contrastLight" : "#B9D8ED" , "emptyText" : "rgba(0, 112, 192,0.2)" } , "secondary" :{ "main" : "#C30038"} , "speedDial" : { "buttonColor" : "#00BC6E" , "hoverColor" : "#006e4d" } , "startingMap" : { "lat" : 38.893709 , "long" : -77.0847874 } , "images" : { "passwordWelcome" : "https://i.imgur.com/7sUELnj.jpg" , "banner" : "https://i.imgur.com/mlcH2lJ.jpg" } }
     *
     *
     */


    palette: {
      primary: (groupTheme && groupTheme.primary) ? groupTheme.primary : {
        main: '#B3A369',
        // light: '#52cfa8',
        // dark: '#006e4d',
        dark: '#003057',
        // contrast: '#002424',
        // contrastLight: '#99e4c5',
        // emptyText: 'rgba(0, 188, 110,0.2)'
      },
      secondary: (groupTheme && groupTheme.secondary) ? groupTheme.secondary : {
        // main: '#0070c0'
        main: '#1879DB',
      },

      speedDial: (groupTheme && groupTheme.speedDial) ? groupTheme.speedDial : {
        buttonColor: '#129AFB',
        hoverColor: '#0070C0'
      },

      red: {
        main: '#C30038',
        hover: '#99002C',
        error: '#FF0000',
        errorLight: '#fcb0b0'
      },

      blue: {
        main: '#0070c0',
        dark: '#00487B'
      },

      green: {
        main: '#00bc6e',
        light: '#b9ebdc',
        dark: '#006e4d',
        vibrant: '#2EC888'
      },

      yellow: {
        warning: '#f2b100',
        warningLight: '#f4e5bc'
      },

      gt: {
        gold: gtGold,
        navy: '#003057',
        yellow: '#EAAA00',
        softWhite: '#F5D580',
        richBlue: '#004F9F',
        lightBlue: '#1879DB'
      },

      gray: {
        light: '#d8d8d8',
        medium: '#bdbdbd',
        dark: '#8e8e8e',
        headline: '#9e9e9e',
        f5: "#f5f5f5",
        fa: "#fafafa",
        ea: "#eaeaea",
        darkText: '#4b4b4b',
        text: '#757575'

      }
    },

    typography: {
      // useNextVariants: true,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      width: '100%'

    },

    firstCard: {
      marginTop: 0
    },

    fonts: {
      // primary: 'Product Sans',
      primary: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      secondary: "'Roboto', 'Helvetica', 'Arial', sans-serif"
    },

    overrides: {
      MuiTypography: {
        h1: {
          fontSize: "4em",
          [defaultTheme.breakpoints.down('sm')]: {
            fontSize: '3em'
          }
        },
        h2:{
          fontSize:'2rem',
        },
        h3: {
          fontSize: '2.125rem',
          [defaultTheme.breakpoints.down('sm')]: {
            fontSize: '1.5em'
          }
        },
        h4: {
          padding: '0 24px 24px'
        },
        h5:{
          color: 'white',
          textShadow: '2px 2px 3px rgba(0,0,0,0.4)',
          fontSize: '2.2rem',
          lineHeight: '2rem',
          [defaultTheme.breakpoints.down('xs')]: {
            fontSize: '1rem',
            lineHeight: '1.5rem'
          }
        },
        body2:{
          padding: '0 24px 24px'
        }
      },
      MuiIconButton: {
        root: {
          width: 60,
          height: 60,
        }
      },
      MuiSvgIcon: {
        root: {
          fontSize: '2rem'
        }
      },
      MuiSwitch:{
        switchBase:{
          width:20,
          height:20,
          fontSize:13.33,
        }
      },

      MuiExpansionPanelSummary: {
        root:{
          '&:hover': {
            backgroundColor: '#f5f5f5'
          },
          "transition": 'background-color ease-out 0.2s !important'
        },
        expandIcon: {
          [defaultTheme.breakpoints.down('sm')]: {
            paddingLeft: 3,
            paddingRight: 0,
            width: 'unset'
          }
        },
      },

      MuiExpansionPanelDetails:{
        root:{
          height: '100%!important',
          paddingBottom: 20,
          maxHeight: 400,
          overflowY: 'auto'
        },
      },

      MuiPaper: {
        elevation3: {
          maxWidth: 1080,
          margin: '50px auto',
          padding: 50,
          [defaultTheme.breakpoints.down('md')]: {
            margin: 50
          },
          [defaultTheme.breakpoints.down('sm')]: {
            margin: 20,
            padding: 20
          }
        }
      },
      MuiSelect: {
        root:{
          paddingRight:36,
        },
        icon: {
          fontSize: '1.5rem',
          right:'4!important',
        }
      },
      MuiButton:{
        containedPrimary:{
          textShadow:'2px 2px 3px rgba(0,0,0,0.4)',
          '&$disabled': {
            textShadow:'none',
          },
        },

      },

      MuiTabs:{
        root:{
          marginLeft: 'auto',
          minWidth: 577,
          [defaultTheme.breakpoints.down('sm')]: {
            display: 'none'
          }
        },
        indicator:{
          backgroundColor: 'white',
        },
      },



      MuiTab:{
        root:{
          padding:0,
          color: 'white!important',
          textShadow: '2px 2px 3px rgba(0,0,0,0.4)',
          fontSize: '1.2rem!important',
          lineHeight: '1.4rem',
          [defaultTheme.breakpoints.down('md')]: {
            minWidth:'140px!important',
          },
          [defaultTheme.breakpoints.down('xs')]: {
            fontSize: '1rem'
          },

        }
      },

      MuiFormControlLabel:{
        root:{
          marginRight:3,
        }
      },


      MuiAppBar:{
        root:{
          overflow: 'hidden',
        }
      },

      MuiDrawer:{
        paperAnchorBottom:{
          minHeight: 70,
          backgroundColor:gtGold,
        }
      }

    }
  });


export default theme;
