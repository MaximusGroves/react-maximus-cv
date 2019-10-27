import React from 'react';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer from '@material-ui/core/Drawer';

import StopIcon from '@material-ui/icons/Stop';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

import Divider from '@material-ui/core/Divider';

import ReactPlayer from 'react-player';
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';

// import Fade from '@material-ui/core/Fade';
// import withWidth from '@material-ui/core/withWidth';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Cart from './shopify/Cart';

import CoverLetter from './CoverLetter';
import Career from './Career';
import Comedy from './Comedy';

import Commerce from './Commerce';
import ProfileMini from './ProfileMini';

// import profileImg from '../assets/images/profile.jpg';
// import resumeUrl from '../assets/data/resume.json';

import MutationObserver from 'react-mutation-observer';

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

import { withStyles, withTheme } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Duration from './Duration'

const style = theme => ({

  root: {
  },

  swipeableRoot: {
    maxHeight: 800
  },

  whiteBtn: {
    color: 'white'
  },

  goldButton: {
    color: theme.palette.gt.gold
  },

  goldOverride: {
    color: theme.palette.gt.gold + '!important',
    textShadow: '2px 2px 3px rgba(255,255,255,0.4)!important'
  },

  // offset:{
  //   ...theme.mixins.toolbar,
  //   flexGrow: 1
  // }

  nudgeTop: {
    ...theme.mixins.toolbar
    // marginTop: 114
  },

  tabIndicator: {
    backgroundColor: 'white'
  },

  tabColor: {
    color: 'white',
    textShadow: '2px 2px 3px rgba(0,0,0,0.4)',
    fontSize: '1.2rem',
    lineHeight: '1.4rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem'
    }
  },

  tabRoot: {
    marginLeft: 'auto',
    minWidth: 577,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },


  playerDrawer: {
    backgroundColor: theme.palette.primary.main
  },

  cartDrawer: {
    [theme.breakpoints.down('xs')]: {
      // width:'100%',
    }
  },

  whiteBtn: {
    color: 'rgba(255,255,255,.8)'
    // textShadow:'2px 2px 3px rgba(0,0,0,0.4)',
  },

  currentAudio: {
    color: 'rgba(255,255,255,.8)',
    marginLeft: 18,
    textShadow: '2px 2px 3px rgba(0,0,0,0.4)'

  },

  gridTitle: {
    width: 'calc(100% - 240px)'
  },

  hideOverflow: {
    overflow: 'hidden'
  },

  menuDrawer: {
    // backgroundColor: theme.palette.gt.gold,
  },

  topItem: {
    //width:400,
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.gt.navy,
    // backgroundColor:'white',
    paddingLeft: 24,
    paddingRight: 24,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
  },

  menuDrawerLink: {
    // color:'white',
  },

  menuGroup: {
    fontSize: '1.5rem',
    padding: 14
    // textAlign:'center',
  },

  badgeMargin: {

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
      experience: [],
      mediumPosts: [],
      podcasts: [],
      favoritePodcasts:[],

      audioUrl: null,
      audioTitle: '',
      audioPlaying: false,

      isCartOpen: false,
      isMenuOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},

      played:0,
      duration:0,

      tabHeights: [0, 0, 0, 0],

      windowHeight: (window.innerHeight)
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);

    this.profileCard = React.createRef();

    this.tabPaths = ['/', '/career', '/comedy', '/commerce'];
  }


  componentDidMount () {
    const isLocal = window.location.hostname === 'localhost';

    const tabState = this.tabPaths.indexOf(this.props.location.pathname);

    // console.log('tabstate', tabState);
    this.setState({ tabState: tabState, profileVisible: tabState === 0 });


    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);

    this.getResume();
    this.getMediumPosts(isLocal);
    this.getPodcasts(isLocal);
    this.getShopify(isLocal);
  }


  getResume = () => {
    //fetch(resumeUrl, {
    fetch('/data/resume.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      response.json().then(resumeData => {
        const { experience, profile, education, favoritePodcasts } = resumeData;
        this.setState({ experience, profile, education, favoritePodcasts });
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
      this.setState({
        checkout: res
      });
    });

    client.product.fetchAll().then((res) => {
      this.setState({
        products: res
      });
    });

    client.shop.fetchInfo().then((res) => {
      this.setState({
        shop: res
      });
    });
  }


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

  handleChange = (evt, val) => {
    this.handleScroll(val);
    this.props.history.push(this.tabPaths[val]);
    this.setState({ tabState: val });
  }

  handleChangeIndex = (index) => {
    this.handleScroll(index);
    this.props.history.push(this.tabPaths[index]);
    this.setState({ tabState: index });
  }

  closePlayer = () => {
    this.setState({ audioUrl: null, audioTitle: '', audioPlaying: false,played:0, duration:0 });
  }

  setAudioUrl = (selectedUrl, selectedTitle) => {
    //console.log(selectedUrl);
    if (this.state.audioUrl === selectedUrl) {
      this.playPause();
    } else {
      this.setState({ audioUrl: selectedUrl, audioTitle: selectedTitle, audioPlaying: true, played:0, duration:0, });
    }
  }

  playPause = () => {
    this.setState({ audioPlaying: !this.state.audioPlaying });
  }

  handleScroll = (tabClickIndex = -1) => {
    if (!this.state.profileVisible && this.isInViewport() && (tabClickIndex > -1 ? (tabClickIndex === 0) : (this.state.tabState === 0))) {
      this.setState({ profileVisible: true });
      // console.log('profile scrolled into view');
    } else if (this.state.profileVisible && (!this.isInViewport() || (tabClickIndex > -1 ? (tabClickIndex !== 0) : (this.state.tabState !== 0)))) {
      this.setState({ profileVisible: false });
      // console.log('profile scrolled out of view');
    }
  }

  isInViewport = (offset = 0) => {
    if (!this.profileCard) return false;
    const top = this.profileCard.current.getBoundingClientRect().bottom;
    return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  handleResize = () => {
    this.setState({ windowHeight: window.innerHeight });
  }

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  }

  handleDuration = (duration) => {
    this.setState({ duration });
  }

  handleProgress = state => {
    this.setState(state);
  }



  render () {
    const { classes, theme, client, width } = this.props;
    const {
      over,
      profileVisible,
      experience,
      profile,
      education,
      mediumPosts,
      podcasts,
      tabState,
      audioUrl,
      audioTitle,
      audioPlaying,
      isCartOpen,
      products,
      checkout,
      isMenuOpen,
      windowHeight,
      favoritePodcasts,
      played,
      duration,

    } = this.state;


    let heightStyle = {
      maxHeight: windowHeight - (width === 'sm ' || width === 'xs' ? 56 : 64) - ((audioUrl && audioUrl !== '') ? 61 : 0)
      // overflowY:'auto',
    };


    let cartTotal = 0;
    checkout.lineItems.forEach(item => cartTotal += item.quantity);


    return (
      <div className={classes.root} >

        {/* Nav Bar */}
        <AppBar variant="fixed" className={classes.hideOverflow}>
          <Toolbar >
            <IconButton edge="start" className={classes.whiteBtn} aria-label="menu" onClick={this.toggleMenu}>
              <MenuIcon />
            </IconButton>

            <ProfileMini profile={profile} profileVisible={profileVisible} />

            <Tabs
              value={tabState}
              onChange={this.handleChange}
              classes={{ indicator: classes.tabIndicator, root: classes.tabRoot }}
              // variant="scrollable"

            >
              <Tab label="Cover" classes={{ root: classes.tabColor }} />
              <Tab label="Career" classes={{ root: classes.tabColor }} />
              <Tab label="Comedy" classes={{ root: classes.tabColor }} />
              <Tab label="Commerce" classes={{ root: classes.tabColor }} />
            </Tabs>
            <IconButton edge="end" className={classes.whiteBtn} aria-label="cart" onClick={this.toggleCart}>
              <Badge className={classes.badgeMargin} badgeContent={cartTotal} color="secondary">
                <ShoppingCartIcon/>
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className={classes.nudgeTop}/>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabState}
          onChangeIndex={this.handleChangeIndex}
          containerStyle={heightStyle}
        >
          <div value={tabState} index={0} dir={theme.direction} >
            <CoverLetter
              profile={profile}
              education={education}
              animationRef={this.profileCard}
            />
          </div>
          <div value={tabState} index={1} dir={theme.direction} >
            <Career experience={experience} />
          </div>
          <div value={tabState} index={2} dir={theme.direction} >
            <Comedy
              mediumPosts={mediumPosts}
              podcasts={podcasts}
              setAudioUrl={this.setAudioUrl}
              audioUrl={audioUrl}
              audioPlaying={audioPlaying}
              favoritePodcasts={favoritePodcasts}
            />
          </div>
          <div value={tabState} index={3} dir={theme.direction} >
            <Commerce
              products={products}
              client={client}
              addVariantToCart={this.addVariantToCart}
            />
          </div>
        </SwipeableViews>

        {/* Nav & Theme Menu */}
        <Drawer
          anchor="left"
          open={isMenuOpen}
          // variant="persistent"
          classes={{ paperAnchorLeft: classes.menuDrawer }}
          onClose={this.handleCloseMenu}
        >
          <Grid container direction="row" alignItems="center" className={classes.topItem}>
            <Grid item>
              <IconButton edge="start" className={classes.whiteBtn} aria-label="menu" onClick={this.toggleMenu}>
                <CloseIcon/>
              </IconButton>
            </Grid>
            <Grid item>
              <ProfileMini profile={profile} profileVisible={false} />
            </Grid>
          </Grid>

          <Typography className={classes.menuGroup}>
            Navigation
          </Typography>
          <Divider className={classes.goldButton}/>
          <MenuItem className={classes.menuDrawerLink} selected={tabState === 0} onClick={e => this.handleChangeIndex(0, e)}>
                Cover Letter
          </MenuItem>
          <Divider className={classes.goldButton}/>
          <MenuItem className={classes.menuDrawerLink} selected={tabState === 1} onClick={e => this.handleChangeIndex(1, e)}>
                Career
          </MenuItem>
          <Divider className={classes.goldButton}/>
          <MenuItem className={classes.menuDrawerLink} selected={tabState === 2} onClick={e => this.handleChangeIndex(2, e)}>
                Comedy
          </MenuItem>
          <Divider className={classes.goldButton}/>
          <MenuItem className={classes.menuDrawerLink} selected={tabState === 3} onClick={e => this.handleChangeIndex(3, e)}>
                Commerce
          </MenuItem>
          <Divider className={classes.goldButton}/>
          <Typography className={classes.menuGroup}>
            Themes
          </Typography>
          <MenuItem className={classes.menuDrawerLink} selected >
            School Spirit
          </MenuItem>
          <Divider className={classes.goldButton}/>
          <MenuItem className={classes.menuDrawerLink} selected={false} >
            Night Game
          </MenuItem>

        </Drawer>

        {/* Podcast Audio Player */}
        <Drawer
          anchor="bottom"
          open={audioUrl && audioUrl !== ''}
          variant="persistent"
          classes={{ paperAnchorBottom: classes.playerDrawer }}
        >

          <Grid container direction="row" alignItems="center">

            <Grid item>

              <IconButton onClick={this.playPause}>
                {audioPlaying ? <PauseIcon className={classes.whiteBtn}/> : <PlayArrow className={classes.whiteBtn}/> }
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={this.closePlayer}>
                <StopIcon className={classes.whiteBtn}/>
              </IconButton>
            </Grid>
            <Grid item zeroMinWidth className={classes.gridTitle}>
              <Typography className={classes.currentAudio} noWrap>
                {audioTitle}
              </Typography>
              <Typography className={classes.currentAudio} noWrap>
                <Duration seconds={duration * played} /> / <Duration seconds={duration} />
              </Typography>
            </Grid>

            <ReactPlayer
              url={audioUrl}
              playing={audioPlaying}
              width={0}
              height={0}
              autoPlay
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />

          </Grid>
        </Drawer>

        {/* Store Shopping Cart */}
        <Drawer
          anchor="right"
          open={isCartOpen}
          variant="persistent"
          classes={{ paperAnchorRight: classes.cartDrawer }}
        >
          <Cart
            checkout={checkout}
            cartTotal={cartTotal}
            isCartOpen={isCartOpen}
            handleCartClose={this.handleCartClose}
            updateQuantityInCart={this.updateQuantityInCart}
            removeLineItemInCart={this.removeLineItemInCart}
          />

        </Drawer>

      </div>
    );
  }
}


export default withWidth()(withTheme(withStyles(style)(withRouter(Home))));
