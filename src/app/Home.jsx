import React, { useRef } from 'react';
import { findDOMNode } from 'react-dom';
import { withRouter } from 'react-router-dom';

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

import ViewPage from './Components/ViewPage';

import Client from 'shopify-buy';

const TOP_BAR_HEIGHT = 64;
const TOP_BAR_HEIGHT_SM = 60;
const BOTTOM_BAR_HEIGHT = 71;

const style = theme => ({

  whiteBtn: {
    color: 'rgba(255,255,255,.9)',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, .5))'
  },

  nudgeTop: {
    // ...theme.mixins.toolbar
    minHeight: TOP_BAR_HEIGHT,
    [theme.breakpoints.down('sm')]: {
      minHeight: TOP_BAR_HEIGHT_SM
    }
  },

  cartBtn:{
    color: 'rgba(255,255,255,.9)',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, .5))',
    [theme.breakpoints.down('xs')]: {
      marginRight: -25,
      paddingLeft: 5,
    }
  },



});


class Home extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      tabState: 0,

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

      client: null,
      isCartOpen: false,
      isMenuOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},

      played: 0,
      duration: 0,

      childScrolling: false
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);

    this.allViews = [
      { name: 'Cover Letter', shortName: "Cover", path: '/', component: CoverLetter, ref: React.createRef(), scrollRef: React.createRef() },
      { name: 'Career', shortName: "Career", path: '/career', component: Career, ref: React.createRef(), scrollRef: React.createRef() },
      { name: 'Comedy', shortName: "Comedy", path: '/comedy', component: Comedy, ref: React.createRef(), scrollRef: React.createRef() },
      { name: 'Commerce', shortName: "Commerce", path: '/commerce', component: Commerce, ref: React.createRef(), scrollRef: React.createRef() }
    ];
  }


  componentDidMount () {
    const isLocal = window.location.hostname === 'localhost';
    const tabState = this.allViews.findIndex(view => {
      return (view.path === this.props.location.pathname);
    });
    this.handleTabChange(null, tabState);

    const client = Client.buildClient({
      storefrontAccessToken: '81d96a7fed4ba666821d0df89000b92a',
      domain: 'sideofepic.com'
    });

    this.getResume();
    this.getMediumPosts(isLocal);
    this.getPodcasts(isLocal);
    this.getShopify(isLocal, client);
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


  getShopify = (isLocal = false, client) => {
    // const msgPath = isLocal ? "http://localhost:9000/getShopify" : "/.netlify/functions/getShopify";
    // fetch(msgPath, {method:"POST"})
    //   .then(response => {
    //     response.json().then(data => this.setState({ podcasts: data }));
    //   })
    //   .catch(err => console.log(err));

    client.checkout.create().then((res) => {
      this.setState({ checkout: res });
    });

    client.product.fetchAll().then((res) => {
      this.setState({ products: res });
    });

    client.shop.fetchInfo().then((res) => {
      this.setState({ shop: res });
    });

    this.setState({ client });
  }


  /****************************************
   ***************Shopify Helpers**********
   ****************************************/


  addVariantToCart = (variantId, quantity) => {
    this.setState({ isCartOpen: true });

    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
    const checkoutId = this.state.checkout.id;

    return this.state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({ checkout: res });
    });
  }

  updateQuantityInCart = (lineItemId, quantity) => {
    const checkoutId = this.state.checkout.id;
    const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }];

    return this.state.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({ checkout: res });
    });
  }

  removeLineItemInCart = (lineItemId) => {
    const checkoutId = this.state.checkout.id;

    return this.state.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
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


  handleTabChange = (evt, val) => {
      if (evt !== null) this.props.history.push(this.allViews[val].path);
      this.setState({ tabState: val, isMenuOpen: false });
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


  render () {
    const { classes, theme, width } = this.props;
    const {
      tabState,
      isMenuOpen,
      isCartOpen,

      experience,
      profile,
      education,
      siteContent,
      mediumPosts,
      podcasts,
      products,
      checkout,

      client,

      audioUrl,
      audioTitle,
      audioPlaying,
      favoritePodcasts,
      filteringFavorites,
      played,
      duration,

      childScrolling

    } = this.state;

    const belowSm = width === 'sm' || width === 'xs';

    const topNudge = (belowSm ? TOP_BAR_HEIGHT_SM : TOP_BAR_HEIGHT);

    const subtractVal = topNudge + ((audioUrl != null) ? BOTTOM_BAR_HEIGHT : 0);



    const heightStyle = {
      height: `calc( 100vh - ${subtractVal}px)`,
      backgroundColor: `${theme.palette.mainBackground}`,
      transition: 'background-color 0.3s, color 0.3s !important'
    };


    const cartTotal = checkout.lineItems.reduce((a, b) => a + (b.quantity || 0), 0);


    const navBarProps = {
      classes: {
        whiteBtn: classes.whiteBtn,
        cartBtn: classes.cartBtn,
      },
      profile,
      tabState,
      cartTotal,
      toggleMenu: this.toggleMenu,
      toggleCart: this.toggleCart,
      TabsProps: {
        value: tabState,
        onChange: this.handleTabChange
      },
      allViews: this.allViews
    };

    const navDrawerProps = {
      DrawerProps: {
        anchor: "left",
        open: isMenuOpen,
        // variant: "persistent",
        // disableBackdropTransition:true,
        onClose: this.handleCloseMenu,
      },
      toggleMenu: this.toggleMenu,
      handleChange: this.handleTabChange,
      profile: profile,
      tabState: tabState,
      allViews: this.allViews
    };

    const podcastDrawerProps = {
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
      education
    };

    const coverProps = {
      ProfileCardProps: profileCardProps,
      content: siteContent.coverTab
    };

    const careerProps = {
      experience,
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

      <div>

        <NavBar {...navBarProps} />

        <div className={classes.nudgeTop}/>

        <div style={{overflow:'hidden', width:'100vw', ...heightStyle}}>

          {this.allViews.map((thisTab, idx) => (
            <ViewPage
              thisPage={thisTab}
              pageNumber={idx}
              currentPage={tabState}
              viewProps={tabProps[idx]}
              topNudge={topNudge}
              subtractVal={subtractVal}
              totalPages={this.allViews.length}
              changeTab={this.handleTabChange}
            />
          ))}

        </div>

        <NavDrawer {...navDrawerProps} />
        <PodcastDrawer {...podcastDrawerProps} />
        <CartDrawer {...cartDrawerProps} />

      </div>

    );
  }
}


export default withWidth()(withTheme(withStyles(style)(withRouter(Home))));


