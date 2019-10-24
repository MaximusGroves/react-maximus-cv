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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import SwipeableViews from 'react-swipeable-views';

// import Fade from '@material-ui/core/Fade';
// import withWidth from '@material-ui/core/withWidth';

import Cart from './shopify/Cart';

import Career from './career.jsx';
import Comedy from './comedy.jsx';
import Profile from './profile.jsx';
import Commerce from './commerce.jsx';

// import profileImg from '../assets/images/profile.jpg';
// import resumeUrl from '../assets/data/resume.json';

import { withStyles, withTheme } from '@material-ui/core/styles';

const style = theme => ({
  root: {

  },

  menuButton: {
    color: 'white'
  },

  // offset:{
  //   ...theme.mixins.toolbar,
  //   flexGrow: 1
  // }

  mudgeTop: {
    marginTop: 114
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
    marginLeft: 'auto'
  },

  rootPaper: {
    margin: 50,
    padding: 50,
    [theme.breakpoints.down('xs')]: {
      margin: 20,
      padding: 20
    }
    // backgroundColor:theme.palette.gt.gold,
    // '&:hover':{
    //   padding:55,
    // },
    // transition: 'padding ease-out 0.2s, box-shadow ease-out 0.2s'
  },

  playerDrawer: {
    backgroundColor: theme.palette.primary.main

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
  }


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
      experience: [],
      mediumPosts: [],
      podcasts: [],

      audioUrl: null,
      audioTitle: '',
      audioPlaying: false,

      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }


  componentDidMount () {
    const isLocal = window.location.hostname === 'localhost';

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


  addVariantToCart (variantId, quantity) {
    this.setState({ isCartOpen: true });

    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
    const checkoutId = this.state.checkout.id;

    return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({ checkout: res });
    });
  }

  updateQuantityInCart (lineItemId, quantity) {
    const checkoutId = this.state.checkout.id;
    const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }];

    return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({ checkout: res });
    });
  }

  removeLineItemInCart (lineItemId) {
    const checkoutId = this.state.checkout.id;

    return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({ checkout: res });
    });
  }

  handleCartClose () {
    this.setState({ isCartOpen: false });
  }

  toggleCart = () =>{
    this.setState({ isCartOpen: !this.state.isCartOpen});
  }

  handleChange= (evt, val) => {
    this.setState({ tabState: val });
  }

  handleChangeIndex= (index) => {
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


  render () {
    const { classes, theme, client } = this.props;
    const {
      over,
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
      checkout
    } = this.state;

    return (
      <div className={classes.mudgeTop}>
        <AppBar position="fixed" >
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Tabs
              value={tabState}
              onChange={this.handleChange}
              classes={{ indicator: classes.tabIndicator, root: classes.tabRoot }}
              variant="scrollable"

            >
              <Tab label="Cover Letter" classes={{ root: classes.tabColor }} />
              <Tab label="Career" classes={{ root: classes.tabColor }} />
              <Tab label="Comedy" classes={{ root: classes.tabColor }} />
              <Tab label="Commerce" classes={{ root: classes.tabColor }} />
            </Tabs>
            <IconButton edge="end" className={classes.menuButton} aria-label="cart" onClick={this.toggleCart}>
              <ShoppingCartIcon  />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Paper elevation={3} className={classes.rootPaper} >

          <Profile profile={profile} education={education} />

          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={tabState}
            onChangeIndex={this.handleChangeIndex}
          >
            <div value={tabState} index={0} dir={theme.direction}>
              <Career profile={profile} education={education} experience={experience}/>
            </div>
            <div value={tabState} index={1} dir={theme.direction}>
              <Career
                profile={profile}
                education={education}
                experience={experience}/>
            </div>
            <div value={tabState} index={2} dir={theme.direction}>
              <Comedy
                mediumPosts={mediumPosts}
                podcasts={podcasts}
                setAudioUrl={this.setAudioUrl}
                audioUrl={audioUrl}
                audioPlaying={audioPlaying}
              />
            </div>
            <div value={tabState} index={3} dir={theme.direction}>
              <Commerce
                products={products}
                client={client}
                addVariantToCart={this.addVariantToCart}
              />
            </div>
          </SwipeableViews>

        </Paper>


        <Drawer
          anchor="bottom"
          open={audioUrl && audioUrl !== ''}
          variant="persistent"
          classes={{ paperAnchorBottom: classes.playerDrawer, root: classes.noBreak }}
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


        <Drawer
          anchor="right"
          open={isCartOpen}
          variant="persistent"
          // classes={{ paperAnchorBottom: classes.playerDrawer, root: classes.noBreak }}
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


export default withTheme(withStyles(style)(Home));
