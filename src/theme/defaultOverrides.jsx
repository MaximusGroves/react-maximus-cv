import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

const buildDefaultOverrides = selectedPalette => ({
  MuiTypography: {
    root: {
      userSelect: 'none'
      // '& a':{
      //   color:'#FF0000'
      // },
      // transition: 'color 0.3s !important'
    },
    h1: {
      fontSize: '4em',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '3em'
      }
    },
    h2: {
      color: 'white',
      textShadow: '2px 2px 3px rgba(0,0,0,0.4)',
      fontSize: '2.2rem',
      lineHeight: '2rem',
      fontWeight: 400,
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '1rem',
        lineHeight: '1.5rem'
      }
    },
    h3: {
      fontSize: '2.125rem',
      lineHeight: '1.2em',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '1.5em'
      }
    },
    h4: {
      padding: '0 0 24px 24px'
    },
    h5: {
      padding: '12px 24px'
    },
    h6: {
      lineHeight: '1.6rem',
      padding: '3px 0'
    },
    body2: {
      padding: '0 24px 24px'
    },
    subtitle1: {
      lineHeight: '1.2rem',
      padding: '3px 0 6px'
    }
  },
  MuiIconButton: {
    root: {
      width: 60,
      height: 60
    }
  },
  MuiSvgIcon: {
    root: {
      fontSize: '2rem'
    }
  },
  MuiSwitch: {
    switchBase: {
      width: 20,
      height: 20,
      fontSize: 13.33
    }
  },

  MuiExpansionPanelSummary: {
    root: {
      '&:hover': {
        backgroundColor: selectedPalette.mainBackground
      },
      '&$expanded': {
        backgroundColor: selectedPalette.mainBackground
        // '&:hover': {
        //
        // },
      }
    },
    expandIcon: {
      [defaultTheme.breakpoints.down('sm')]: {
        paddingLeft: 3,
        paddingRight: 0,
        width: 'unset'
      }
    }
  },

  MuiExpansionPanelDetails: {
    root: {
      height: '100%!important',
      paddingBottom: 20,
      maxHeight: 400,
      overflowY: 'auto',
      flexDirection: 'column'
    }
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
    root: {
      paddingRight: 36
    },
    icon: {
      fontSize: '1.5rem',
      right: '4!important'
    }
  },
  MuiButton: {
    containedPrimary: {
      "textShadow": '2px 2px 3px rgba(0,0,0,0.4)',
      "color": 'white',
      "fontSize": '1.2rem',
      "padding": 12,
      '&$disabled': {
        textShadow: 'none'
      }
    }
  },

  MuiTabs: {
    root: {
      marginLeft: 'auto',
      minWidth: 577,
      [defaultTheme.breakpoints.down('sm')]: {
        // display: 'none'
        minWidth: 98
      }
    },
    indicator: {
      backgroundColor: 'white'
    }
  },

  MuiTab: {
    root: {
      "padding": 0,
      "color": 'white!important',
      "textShadow": '2px 2px 3px rgba(0,0,0,0.4)',
      "fontSize": '1.2rem!important',
      "lineHeight": '1.4rem',
      [defaultTheme.breakpoints.down('md')]: {
        minWidth: '140px!important'
      },
      [defaultTheme.breakpoints.down('sm')]: {
        display: 'none'
      },
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '1rem'
      },
      '&$selected': {
        display: 'inline-flex!important',
        [defaultTheme.breakpoints.down('xs')]: {
          fontSize: '1rem!important',
          minWidth: '98px!important',
          marginLeft: 2
        }
      }
    }
  },

  MuiFormControlLabel: {
    root: {
      marginRight: 3
    }
  },

  MuiAppBar: {
    root: {
      overflow: 'hidden',
      width: '100vw'
    }
  },

  MuiDrawer: {
    // paper: {
    //
    // },
    paperAnchorBottom: {
      minHeight: 70,
      backgroundColor: selectedPalette.primary.main,
      transition:
        'background-color 0.3s, transform 0.225s cubic-bezier(0, 0, 0.2, 1) 0s !important'
    },
    paperAnchorRight: {
      transition:
        'background-color 0.3s, transform 0.225s cubic-bezier(0, 0, 0.2, 1) 0s !important'
    }
  },

  MuiMenuItem: {
    root: {
      minHeight: '48px!important'
    }
  }
});

export default buildDefaultOverrides;
