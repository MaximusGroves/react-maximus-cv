import React from 'react';
import { findDOMNode } from 'react-dom';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import CoverLetter from './Views/CoverLetter';
import Career from './Views/Career';
import Comedy from './Views/Comedy';
import Commerce from './Views/Commerce';

import NavBar from './Components/NavBar';
import NavDrawer from './Components/NavDrawer';
import CartDrawer from './Components/CartDrawer';
import PodcastDrawer from './Components/PodcastDrawer';

import { withStyles, withTheme } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

const TOP_BAR_HEIGHT = 64;
const BOTTOM_BAR_HEIGHT = 71;

const style = theme => ({

  whiteBtn: {
    color: 'rgba(255,255,255,.9)',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, .5))'
  },

  nudgeTop: {
    // ...theme.mixins.toolbar
    minHeight: TOP_BAR_HEIGHT
    // [theme.breakpoints.down('sm')]: {
    //   minHeight: 64
    // }
  },

  /****************************************
   ***************Podcast Drawer***********
   ****************************************/

  currentAudio: {
    color: 'rgba(255,255,255,.9)',
    marginLeft: 18,
    textShadow: '1px 1px 3px rgba(0,0,0,0.9)',
    fontSize: '1.2rem'
  },

  gridTitle: {
    width: 'calc(100% - 240px)'
  },

  verticalAutoMargin: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  /****************************************
  ***************Nav Drawer****************
  ****************************************/

  topItem: {
    //width:400,
    // ...theme.mixins.toolbar,
    backgroundColor: theme.palette.gt.navy,
    // backgroundColor:'white',
    paddingLeft: 24,
    paddingRight: 24,
    minHeight: '64px!important',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('xs')]: {
      minHeight: '60px!important'
    }
  },

  menuGroup: {
    fontSize: '1.5rem',
    padding: 14
  },

  miniProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    transition: 'transform  0.3s',
    marginRight: 'auto'
  },

  avatar: {
    boxShadow: '2px 2px 3px rgba(0,0,0,0.4)',
    width: 56,
    height: 56,
    borderRadius: 1000,
    margin: '0 16px'
  },

  scrollUp: {
    transform: 'translateY(100px)'
  },

  nameColor: {
    color: 'white',
    textShadow: '2px 2px 3px rgba(0,0,0,0.4)',
    fontSize: '2.2rem',
    lineHeight: '2rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem'
    }
  },

  /***************************************
   ***********Profile Card****************
   ***************************************/


  /*********************************
  *****Experience Expansion Cards***************
   ********************************/
  expandableSummary: {
    '&:hover': {
      backgroundColor: theme.palette.gray.f5
    },
    "transition": 'backgroundColor ease-out 0.2s, '
  },
  // paperExpanded:{
  //   margin: 'auto!important'
  // },
  // expandedContent:{
  //   height: '100%!important',
  // },

  forceNoWrap: {
    whiteSpace: 'nowrap',
    marginTop: 'auto',
    marginBottom: 'auto'
  }


});


class Home extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      tabState: 0,
      profileVisible: true,

      profile: {
        name: "",
        tagline: "",
        image: ""
      },
      education: {
        college: "",
        graduation: "",
        degree: ""
      },
      siteContent: {
        coverTab: { coverLetter: { title: '', description: '' } },
        careerTab: { experience: { title: "", description: "" }, clients: { title: "", description: "" } },
        comedyTab: { standup: { title: "", description: "" }, improv: { title: '', description: '' }, writing: { title: '', description: '' }, podcasts: { title: '', description: '' } },
        commerceTab: { pitch: { description: '', slogan: '', detailed: '' } }
      },

      experience: [],
      mediumPosts: [],
      podcasts: [],
      favoritePodcasts: [],
      filteringFavorites: false,

      audioUrl: null,
      audioTitle: '',
      audioPlaying: false,

      isCartOpen: false,
      isMenuOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},

      played: 0,
      duration: 0,

      windowHeight: (window.innerHeight)
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);

    this.profileCard = React.createRef();
    this.scrollRef = React.createRef();

    this.allViews = [
      { name: 'Cover Letter', shortName: "Cover", path: '/', component: CoverLetter },
      { name: 'Career', shortName: "Career", path: '/career', component: Career },
      { name: 'Comedy', shortName: "Comedy", path: '/comedy', component: Comedy },
      { name: 'Commerce', shortName: "Commerce", path: '/commerce', component: Commerce }
    ];
  }


  componentDidMount () {
    const isLocal = window.location.hostname === 'localhost';
    const tabState = this.allViews.findIndex(view => {
      return (view.path === this.props.location.pathname);
    });
    this.setState({ tabState: tabState, profileVisible: tabState === 0 });

    if (tabState === 0) {
      findDOMNode(this.scrollRef.current).parentElement.parentElement.addEventListener('scroll', this.handleScroll);
    }
    window.addEventListener('resize', this.handleResize);

    this.getResume();
    this.getMediumPosts(isLocal);
    this.getPodcasts(isLocal);
    this.getShopify(isLocal);
  }


  /****************************************
   ***************api calls****************
   ****************************************/


  getResume = () => {
    //fetch(resumeUrl, {
    fetch('/data/resume.json', { //exposed the address because, why not, read my resume if you want to
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      response.json().then(resumeData => {
        const { experience, profile, education, favoritePodcasts, siteContent } = resumeData;
        this.setState({ experience, profile, education, favoritePodcasts, siteContent });
      });
    }
    );
  }

  getMediumPosts = (isLocal = false) => {
    const msgPath = isLocal ? "http://localhost:9000/getMedium" : "/.netlify/functions/getMedium";
    fetch(msgPath)
      .then(response => {
        response.json().then(data => this.setState({ mediumPosts: data }));
      })
      .catch(err => console.log(err));
  }

  getPodcasts = (isLocal = false) => {
    const msgPath = isLocal ? "http://localhost:9000/getPodcast" : "/.netlify/functions/getPodcast";
    fetch(msgPath)
      .then(response => {
        response.json().then(data => this.setState({ podcasts: data }));
      })
      .catch(err => console.log(err));
  }


  getShopify = (isLocal = false) => {
    // const msgPath = isLocal ? "http://localhost:9000/getShopify" : "/.netlify/functions/getShopify";
    // fetch(msgPath, {method:"POST"})
    //   .then(response => {
    //     response.json().then(data => this.setState({ podcasts: data }));
    //   })
    //   .catch(err => console.log(err));

    const { client } = this.props;

    client.checkout.create().then((res) => {
      this.setState({ checkout: res });
    });

    client.product.fetchAll().then((res) => {
      this.setState({ products: res });
    });

    client.shop.fetchInfo().then((res) => {
      this.setState({ shop: res });
    });
  }


  /****************************************
   ***************Shopify Helpers**********
   ****************************************/


  addVariantToCart = (variantId, quantity) => {
    this.setState({ isCartOpen: true });

    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
    const checkoutId = this.state.checkout.id;

    return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({ checkout: res });
    });
  }

  updateQuantityInCart = (lineItemId, quantity) => {
    const checkoutId = this.state.checkout.id;
    const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }];

    return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({ checkout: res });
    });
  }

  removeLineItemInCart = (lineItemId) => {
    const checkoutId = this.state.checkout.id;

    return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({ checkout: res });
    });
  }

  handleCartClose = () => {
    this.setState({ isCartOpen: false });
  }

  toggleCart = () => {
    this.setState({ isCartOpen: !this.state.isCartOpen });
  }


  /****************************************
   ***************Nav Bar******************
   ****************************************/


  handleChange = (evt, val) => {
    this.checkProfileShown(val);
    this.props.history.push(this.allViews[val].path);
    this.setState({ tabState: val });
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  }


  /****************************************
   ***************Podcast Player***********
   ****************************************/


  closePlayer = () => {
    this.setState({ audioUrl: null, audioTitle: '', audioPlaying: false, played: 0, duration: 0 });
  }

  setAudioUrl = (selectedUrl, selectedTitle) => {
    if (this.state.audioUrl === selectedUrl) {
      this.playPause();
    } else {
      this.setState({ audioUrl: selectedUrl, audioTitle: selectedTitle, audioPlaying: true, played: 0, duration: 0 });
    }
  }

  playPause = () => {
    this.setState({ audioPlaying: !this.state.audioPlaying });
  }

  handleDuration = (duration) => {
    this.setState({ duration });
  }

  handleProgress = state => {
    this.setState(state);
  }


  handleFavoritesChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  }


  /****************************************
   ***************View Fixers***********
   ****************************************/

  handleResize = () => {
    this.setState({ windowHeight: window.innerHeight });
  }

  checkProfileShown = (tabClickIndex = -1) => {
    if (tabClickIndex === 0) {
      findDOMNode(this.scrollRef.current).parentElement.parentElement.addEventListener('scroll', this.handleScroll);
      this.handleScroll();
    } else if (this.state.profileVisible === true) {
      findDOMNode(this.scrollRef.current).parentElement.parentElement.removeEventListener('scroll', this.handleScroll);
      this.setState({ profileVisible: false });
    }
  }


  handleScroll = (e) => {
    const profileVisible = this.scrollRef.current.getBoundingClientRect().top > -250;
    if (this.state.profileVisible != profileVisible) {
      this.setState({ profileVisible });
    }
  }


  render () {
    const { classes, theme, client, width } = this.props;
    const {
      tabState,
      profileVisible,
      isMenuOpen,
      isCartOpen,
      windowHeight,

      experience,
      profile,
      education,
      siteContent,
      mediumPosts,
      podcasts,
      products,
      checkout,

      audioUrl,
      audioTitle,
      audioPlaying,
      favoritePodcasts,
      filteringFavorites,
      played,
      duration
    } = this.state;

    // const belowSm = width === 'sm' || width === 'xs';

    const heightStyle = {
      maxHeight: windowHeight - TOP_BAR_HEIGHT - ((audioUrl) ? BOTTOM_BAR_HEIGHT : 0)
    };
    const cartTotal = checkout.lineItems.reduce((a, b) => a + (b.quantity || 0), 0);

    const miniProfileClasses = {
      miniProfile: classes.miniProfile,
      scrollUp: classes.scrollUp,
      avatar: classes.avatar,
      nameColor: classes.nameColor
    };

    const navBarProps = {
      classes: {
        whiteBtn: classes.whiteBtn
      },
      miniProfileClasses: miniProfileClasses,
      profile,
      profileVisible,
      tabState,
      cartTotal,
      toggleMenu: this.toggleMenu,
      toggleCart: this.toggleCart,
      TabsProps: {
        value: tabState,
        onChange: this.handleChange
      },
      allViews: this.allViews
    };

    const navDrawerProps = {
      classes: {
        whiteBtn: classes.whiteBtn,
        menuGroup: classes.menuGroup,
        topItem: classes.topItem
      },
      miniProfileClasses: miniProfileClasses,
      DrawerProps: {
        anchor: "left",
        open: isMenuOpen,
        // variant="persistent",
        onClose: this.handleCloseMenu
      },
      toggleMenu: this.toggleMenu,
      handleChange: this.handleChange,
      profile: profile,
      tabState: tabState,
      allViews: this.allViews
    };

    const podcastDrawerProps = {
      classes: {
        whiteBtn: classes.whiteBtn,
        gridTitle: classes.gridTitle,
        currentAudio: classes.currentAudio,
        verticalAutoMargin: classes.verticalAutoMargin,
        color: 'primary'
      },
      DrawerProps: {
        anchor: "bottom",
        open: (audioUrl != null),
        variant: "persistent"
      },
      PlayerProps: {
        url: audioUrl,
        playing: audioPlaying,
        width: 0,
        height: 0,
        autoPlay: true,
        onProgress: this.handleProgress,
        onDuration: this.handleDuration,
        duration,
        played
      },
      playPause: this.playPause,
      closePlayer: this.closePlayer,
      audioTitle: audioTitle
    };

    const cartDrawerProps = {
      DrawerProps: {
        anchor: "right",
        open: isCartOpen,
        variant: "persistent"
      },
      CartProps: {
        checkout: checkout,
        cartTotal: cartTotal,
        isCartOpen: isCartOpen,
        handleCartClose: this.handleCartClose,
        updateQuantityInCart: this.updateQuantityInCart,
        removeLineItemInCart: this.removeLineItemInCart
      }
    };

    const profileCardProps = {
      profile,
      education,
      animationRef: this.profileCard
    };

    const expansionCardProps = {
      expandableSummary: classes.expandableSummary,
      forceNoWrap: classes.forceNoWrap
    };

    const swipeableViewProps = {
      value: tabState,
      dir: theme.direction
    };


    const coverProps = {
      ProfileCardProps: profileCardProps,
      content: siteContent.coverTab,
      scrollRef: this.scrollRef
    };
    const careerProps = {
      experience,
      expansionCardProps,
      content: siteContent.careerTab
    };
    const comedyProps = {
      mediumPosts,
      podcasts,
      setAudioUrl: this.setAudioUrl,
      audioUrl,
      audioPlaying,
      favoritePodcasts,
      handleFavoritesChecked: this.handleFavoritesChecked,
      filteringFavorites,
      content: siteContent.comedyTab
    };
    const commerceProps = {
      products,
      client,
      addVariantToCart: this.addVariantToCart,
      content: siteContent.commerceTab
    };

    const tabProps = [
      coverProps, careerProps, comedyProps, commerceProps
    ];


    return (
      <div >
        <NavBar {...navBarProps} />

        <div className={classes.nudgeTop}/>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabState}
          onChangeIndex={val => this.handleChange(null, val)}
          containerStyle={heightStyle}
        >
          {this.allViews.map((thisTab, idx) =>
            React.createElement('div', { ...swipeableViewProps, index: idx, key: 'tab-' + thisTab.shortName },
              React.createElement(thisTab.component, tabProps[idx])
            )
          )}
        </SwipeableViews>

        <NavDrawer {...navDrawerProps} />
        <PodcastDrawer {...podcastDrawerProps} />
        <CartDrawer {...cartDrawerProps} />

      </div>

    );
  }
}


export default withWidth()(withTheme(withStyles(style)(withRouter(Home))));
