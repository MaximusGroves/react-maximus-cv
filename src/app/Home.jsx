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

import Divider from '@material-ui/core/Divider';

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

const style = theme => ({
  root: {

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

      audioUrl: null,
      audioTitle: '',
      audioPlaying: false,

      isCartOpen: false,
      isMenuOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},

      tabHeights: [0, 0, 0, 0],
      currentMaxHeight: 0
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);

    this.profileCard = React.createRef();

    this.tabRef0 = React.createRef();
    this.tabRef1 = React.createRef();
    this.tabRef2 = React.createRef();
    this.tabRef3 = React.createRef();

    this.tabPaths = ['/', '/career', '/comedy', '/commerce'];
  }


  componentDidMount () {
    const isLocal = window.location.hostname === 'localhost';

    const tabState = this.tabPaths.indexOf(this.props.location.pathname);

    console.log('tabstate', tabState);
    this.setState({ tabState: tabState });


    window.addEventListener('scroll', this.handleScroll);
    // window.addEventListener('resize', this.handleResize);

    // this.handleResize();

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
        const { experience, profile, education } = resumeData;
        this.setState({ experience, profile, education });
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
    // const currentHeight = this["tabRef" + val].current.getBoundingClientRect().height + 100;
    // this.setState({ tabState: val, currentMaxHeight: currentHeight });

    const tabNames = ['/', '/career', 'comedy', '/commerce'];

    this.props.history.push(tabNames[val]);

    this.setState({ tabState: val });
  }

  handleChangeIndex = (index) => {
    this.handleScroll(index);
    // const currentHeight = this["tabRef" + index].current.getBoundingClientRect().height + 100;
    // this.setState({ tabState: index, currentMaxHeight: currentHeight });

    const tabNames = ['/', '/career', 'comedy', '/commerce'];

    this.props.history.push(tabNames[index]);

    this.setState({ tabState: index });
  }

  closePlayer = () => {
    this.setState({ audioUrl: null, audioTitle: '' });
  }

  setAudioUrl = (selectedUrl, selectedTitle) => {
    if (this.state.audioUrl === selectedUrl) {
      this.playPause();
    } else {
      this.setState({ audioUrl: selectedUrl, audioTitle: selectedTitle, audioPlaying: true });
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
    // console.log('resize')
    // try {
    //   const height0 = this.tabRef0.current.getBoundingClientRect().height + 100;
    //   const height1 = this.tabRef1.current.getBoundingClientRect().height + 100;
    //   const height2 = this.tabRef2.current.getBoundingClientRect().height + 100;
    //   const height3 = this.tabRef3.current.getBoundingClientRect().height + 100;
    //   const heights = [height0, height1, height2, height3];
    //   const thisHeight = heights[this.state.tabState];
    //
    //   console.log(heights);
    //
    //   this.setState({tabHeights: heights, currentMaxHeight: thisHeight});
    //   return thisHeight;
    // } catch(err){
    //   return 0;
    // }
  }

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  }


  slideRenderer = (params) => {
    const { index, key } = params;
    const { client, theme } = this.props;
    const {
      profile,
      education,
      experience,
      mediumPosts,
      podcasts,
      audioUrl,
      audioPlaying,
      products,
      tabState
    } = this.state;

    let bodyComponent;


    const theVal = Math.abs(index % 4);

    // console.log('theVal', theVal);

    switch (theVal) {
    case (0):
      bodyComponent = (
        <CoverLetter
          profile={profile}
          education={education}
          animationRef={this.profileCard}
        />
      );
      break;

    case (1):
      bodyComponent = (
        <Career
          profile={profile}
          education={education}
          experience={experience}
        />
      );
      break;

    case (2):
      bodyComponent = (
        <Comedy
          mediumPosts={mediumPosts}
          podcasts={podcasts}
          setAudioUrl={this.setAudioUrl}
          audioUrl={audioUrl}
          audioPlaying={audioPlaying}
        />
      );
      break;

    case (3):
      bodyComponent = (
        <Commerce
          products={products}
          client={client}
          addVariantToCart={this.addVariantToCart}
        />
      );
      break;

    default:
      break;
    }

    return (
      <div key={key}>
        {bodyComponent}
      </div>

    );
  }


  render () {
    const { classes, theme, client } = this.props;
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
      audioPlaying,
      isCartOpen,
      products,
      checkout,
      isMenuOpen,
      currentMaxHeight
    } = this.state;


    let heightStyle = {};
    // if(currentMaxHeight===0){
    //   const newHeight = this.handleResize();
    //   if(newHeight !== 0){
    //     heightStyle = {maxHeight:newHeight, overflow:'hidden'}
    //   }
    // } else {
    //   heightStyle = {maxHeight:currentMaxHeight, overflow:'hidden'}
    // }

    // if(this['tabRef' + tabState].current){
    //   heightStyle = {maxHeight:(this['tabRef' + tabState].current.getBoundingClientRect().height + 100), overflow:'hidden'}
    // }


    return (
      <div>

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
              <ShoppingCartIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.nudgeTop}/>


        {/* Virtualized version of the main view that hurts performance when adding & removing the major components */}

        {/*<VirtualizeSwipeableViews*/}
        {/*index={tabState}*/}
        {/*onChangeIndex={this.handleChangeIndex}*/}
        {/*slideRenderer={this.slideRenderer}*/}
        {/*overscanSlideAfter={0}*/}
        {/*overscanSlideBefore={0}*/}
        {/*slideCount={4}*/}

        {/*/>*/}


        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabState}
          onChangeIndex={this.handleChangeIndex}
          // className={classes.swipeableRoot}
          style={heightStyle}
        >
          {/*<MutationObserver*/}
            {/*onContentChange={console.log.bind(null, 'Change content triggered.')}*/}
            {/*onAttributeChange={console.log.bind(null, 'Change attribute triggered.')}*/}
          {/*>*/}
            <div value={tabState} index={0} dir={theme.direction} ref={this.tabRef0}>
              <CoverLetter profile={profile} education={education} animationRef={this.profileCard} />
            </div>
          {/*</MutationObserver>*/}
          {/*<MutationObserver*/}
            {/*onContentChange={console.log.bind(null, 'Change content triggered.')}*/}
            {/*onAttributeChange={console.log.bind(null, 'Change attribute triggered.')}*/}
          {/*>*/}
            <div value={tabState} index={1} dir={theme.direction} ref={this.tabRef1}>
              <Career
                profile={profile}
                education={education}
                experience={experience}/>
            </div>
          {/*</MutationObserver>*/}
          {/*<MutationObserver*/}
            {/*onContentChange={console.log.bind(null, 'Change content triggered.')}*/}
            {/*onAttributeChange={console.log.bind(null, 'Change attribute triggered.')}*/}
          {/*>*/}
            <div value={tabState} index={2} dir={theme.direction} ref={this.tabRef2}>
              <Comedy
                mediumPosts={mediumPosts}
                podcasts={podcasts}
                setAudioUrl={this.setAudioUrl}
                audioUrl={audioUrl}
                audioPlaying={audioPlaying}
              />
            </div>
          {/*</MutationObserver>*/}
          {/*<MutationObserver*/}
            {/*onContentChange={console.log.bind(null, 'Change content triggered.')}*/}
            {/*onAttributeChange={console.log.bind(null, 'Change attribute triggered.')}*/}
          {/*>*/}
            <div value={tabState} index={3} dir={theme.direction} ref={this.tabRef3}>
              <Commerce
                products={products}
                client={client}
                addVariantToCart={this.addVariantToCart}
              />
            </div>
          {/*</MutationObserver>*/}
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
                {audioUrl}
              </Typography>
            </Grid>
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


export default withTheme(withStyles(style)(withRouter(Home)));
