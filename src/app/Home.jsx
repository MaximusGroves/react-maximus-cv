import React from 'react';
import { withRouter } from 'react-router-dom';

import withWidth from '@material-ui/core/withWidth';
import { withStyles, withTheme } from '@material-ui/core/styles';

import CoverLetter from 'views/CoverLetter';
import Career from 'views/Career';
import Comedy from 'views/Comedy';
import Commerce from 'views/Commerce';

import NavBar from 'components/NavBar';
import ViewPage from 'components/ViewPage';
import NavDrawer from 'components/NavDrawer';
import CartDrawer from 'components/CartDrawer';
import PodcastDrawer from 'components/PodcastDrawer';

import netlifyIdentity from 'netlify-identity-widget';
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

  cartBtn: {
    color: 'rgba(255,255,255,.9)',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, .5))'
    // [theme.breakpoints.down('xs')]: {
    //   marginRight: -25,
    //   paddingLeft: 5,
    // }
  }
});

class Home extends React.PureComponent {
  constructor (props) {
    super(props);

    const currentUser = netlifyIdentity.currentUser();
    // console.log('currentuser', currentUser);

    this.state = {
      tabState: 0,

      profile: {
        name: '',
        tagline: '',
        image: ''
      },

      email: '',

      education: {
        college: '',
        graduation: '',
        degree: ''
      },
      siteContent: {
        coverTab: null,
        careerTab: null,
        comedyTab: null,
        commerceTab: null
      },

      experience: [],
      mediumPosts: [],
      podcasts: [],
      favoritePodcasts: [],

      toDoList: [],

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

      apiWaiting: false,

      user: currentUser,
      authenticated: currentUser !== null
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);

    this.allViews = [
      {
        name: 'Cover Letter',
        shortName: 'Cover',
        path: '/',
        component: CoverLetter,
        ref: React.createRef()
      },
      {
        name: 'Career',
        shortName: 'Career',
        path: '/career',
        component: Career,
        ref: React.createRef()
      },
      {
        name: 'Comedy',
        shortName: 'Comedy',
        path: '/comedy',
        component: Comedy,
        ref: React.createRef()
      },
      {
        name: 'Commerce',
        shortName: 'Commerce',
        path: '/commerce',
        component: Commerce,
        ref: React.createRef()
      }
    ];
  }


  componentDidMount () {
    const isLocal = window.location.hostname === 'localhost';
    const tabState = this.allViews.findIndex(view => {
      return view.path === this.props.location.pathname;
    });
    this.handleTabChange(null, tabState);

    this.getResume();
    this.getMediumPosts(isLocal);
    this.getPodcasts(isLocal);
    this.getShopify(isLocal);
    this.getToDoList(isLocal);
  }

  /****************************************
   ***************api calls****************
   ****************************************/

  getResume = () => {
    fetch('/data/resume.json', {
      //exposed the address because, why not, read my resume if you want to
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json'
      }
    }).then(response => {
      response.json().then(resumeData => {
        const {
          experience,
          profile,
          education,
          favoritePodcasts,
          siteContent
        } = resumeData;
        this.setState({
          experience,
          profile,
          education,
          favoritePodcasts,
          siteContent
        });
      });
    });
  };

  getMediumPosts = (isLocal = false) => {
    const msgPath = isLocal ?
      'http://localhost:9000/getMedium' :
      '/.netlify/functions/getMedium';
    fetch(msgPath)
      .then(response => {
        response.json().then(data => this.setState({ mediumPosts: data }));
      })
      .catch(err => console.log(err));
  };

  getPodcasts = (isLocal = false) => {
    const msgPath = isLocal ?
      'http://localhost:9000/getPodcast' :
      '/.netlify/functions/getPodcast';
    fetch(msgPath)
      .then(response => {
        response.json().then(data => this.setState({ podcasts: data }));
      })
      .catch(err => console.log(err));
  };

  getShopify = (isLocal = false) => {
    const msgPath = isLocal ?
      'http://localhost:9000/getShopifyHardcode' :
      '/.netlify/functions/getShopify';
    fetch(msgPath, { method: 'GET' })
      .then(response => {
        response.json().then(data => {
          this.setState({ email: data.contactEmail });

          const client = Client.buildClient({
            storefrontAccessToken: data.storefront,
            domain: data.domain
          });

          client.checkout.create().then(res => {
            this.setState({ checkout: res });
          });

          client.product.fetchAll().then(res => {
            this.setState({ products: res });
          });

          client.shop.fetchInfo().then(res => {
            this.setState({ shop: res });
          });

          this.setState({ client });
        });
      })
      .catch(err => console.log(err));
  };

  postAPI = (source, data) => {
    const isLocal = window.location.hostname === 'localhost';
    return fetch(
      (isLocal ? 'http://localhost:9000/' : '/.netlify/functions/') + source,
      {
        method: 'post',
        body: JSON.stringify(data)
      }
    )
      .then(res => res.json())
      .catch(err => err);
  };

  refreshList = () => {
    this.getToDoList();
  };

  // CRUD Handlers
  getToDoList = () => {
    this.postAPI('toDoItemRead')
      .then(response => {
        if (response) {
          this.setState({ toDoList: response });
        }
      })
      .catch(err => {
        console.log('ToDoListRead API Error', err);
      });
  };

  handleCreateToDo = data => {
    this.postAPI('toDoItemCreate', data)
      .then(response => {
        const toDoList = [...this.state.toDoList];
        toDoList.push(response);
        this.setState({ toDoList, apiWaiting: false });
      })
      .catch(err => {
        console.log('ToDoListCreate API error: ', err);
        this.setState({ apiWaiting: false });
      });
  };

  handleUpdateToDo = data => {
    this.postAPI('toDoItemUpdate', { id: data.id, toDoItem: data })
      .then(response => {
        const toDoList = [...this.state.toDoList];
        const updatedIndex = toDoList.findIndex(
          item => item._id === response._id
        );
        toDoList[updatedIndex] = response;
        this.setState({ toDoList });

        // this.setState({ })
      })
      .catch(err => console.log('ToDoListUpdate API error: ', err));
  };

  handleDeleteToDo = id => {
    this.postAPI('toDoItemDelete', id)
      .then(response => {
        const toDoList = this.state.toDoList.filter(
          item => item._id !== response._id
        );
        this.setState({ toDoList });
      })
      .catch(err => console.log('ProductDelete API error: ', err));
  };

  createToDo = note => {
    this.setState({ apiWaiting: true });
    this.handleCreateToDo({
      name: 'an item',
      description: note,
      done: false
    });
  };

  checkItem = item => {
    const updatedItem = { ...item, done: !item.done };
    this.handleUpdateToDo(updatedItem);
  };

  /****************************************
   ***************Shopify Helpers**********
   ****************************************/

  addVariantToCart = (variantId, quantity) => {
    this.setState({ isCartOpen: true });

    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
    const checkoutId = this.state.checkout.id;

    return this.state.client.checkout
      .addLineItems(checkoutId, lineItemsToAdd)
      .then(res => {
        this.setState({ checkout: res });
      });
  };

  updateQuantityInCart = (lineItemId, quantity) => {
    const checkoutId = this.state.checkout.id;
    const lineItemsToUpdate = [
      { id: lineItemId, quantity: parseInt(quantity, 10) }
    ];

    return this.state.client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then(res => {
        this.setState({ checkout: res });
      });
  };

  removeLineItemInCart = lineItemId => {
    const checkoutId = this.state.checkout.id;

    return this.state.client.checkout
      .removeLineItems(checkoutId, [lineItemId])
      .then(res => {
        this.setState({ checkout: res });
      });
  };

  handleCartClose = () => {
    this.setState({ isCartOpen: false });
  };

  toggleCart = () => {
    this.setState({ isCartOpen: !this.state.isCartOpen });
  };

  /****************************************
   ***************Nav Bar******************
   ****************************************/

  handleTabChange = (evt, val) => {
    if (evt !== null) this.props.history.push(this.allViews[val].path);
    this.setState({ tabState: val, isMenuOpen: false });
  };

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  /****************************************
   ***************Podcast Player***********
   ****************************************/

  closePlayer = () => {
    this.setState({
      audioUrl: null,
      audioTitle: '',
      audioPlaying: false,
      played: 0,
      duration: 0
    });
  };

  setAudioUrl = (selectedUrl, selectedTitle) => {
    if (this.state.audioUrl === selectedUrl) {
      this.playPause();
    } else {
      this.setState({
        audioUrl: selectedUrl,
        audioTitle: selectedTitle,
        audioPlaying: true,
        played: 0,
        duration: 0
      });
    }
  };

  playPause = () => {
    this.setState({ audioPlaying: !this.state.audioPlaying });
  };

  handleDuration = duration => {
    this.setState({ duration });
  };

  handleProgress = state => {
    this.setState(state);
  };

  handleSignIn = callback => {
    netlifyIdentity.open();
    netlifyIdentity.on('login', user => {
      this.setState({ user, authenticated: true });
      console.log(user);
      // if(callback){
      //   callback(user);
      // }
    });
  };

  handleSignOut = callback => {
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      this.setState({ user: null, authenticated: false });
      // if(callback){
      //   callback()
      // }
    });
  };

  render () {
    const { classes, theme, width } = this.props;
    const {
      tabState,
      isMenuOpen,
      isCartOpen,

      experience,
      profile,
      education,
      email,
      siteContent,
      mediumPosts,
      podcasts,
      products,
      checkout,

      toDoList,

      client,

      audioUrl,
      audioTitle,
      audioPlaying,
      favoritePodcasts,

      played,
      duration,

      user,
      authenticated,

      apiWaiting
    } = this.state;

    const cartTotal = checkout.lineItems.reduce(
      (a, b) => a + (b.quantity || 0),
      0
    );

    const belowSm = width === 'sm' || width === 'xs';
    const topNudge = belowSm ? TOP_BAR_HEIGHT_SM : TOP_BAR_HEIGHT;
    const subtractVal = topNudge + (audioUrl !== null ? BOTTOM_BAR_HEIGHT : 0);

    const heightStyle = {
      height: `calc( 100vh - ${subtractVal}px)`,
      backgroundColor: `${theme.palette.mainBackground}`,
      transition: 'background-color 0.3s, color 0.3s !important'
    };

    const podcastPlaying = audioUrl !== null;

    const navBarProps = {
      classes: {
        whiteBtn: classes.whiteBtn,
        cartBtn: classes.cartBtn
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
      allViews: this.allViews,

      onSignIn: this.handleSignIn,
      onSignOut: this.handleSignOut,
      authenticated,
      user
    };

    const navDrawerProps = {
      DrawerProps: {
        anchor: 'left',
        open: isMenuOpen,
        // variant: "persistent",
        // disableBackdropTransition:true,
        onClose: this.handleCloseMenu
      },
      toggleMenu: this.toggleMenu,
      handleChange: this.handleTabChange,
      profile: profile,
      tabState: tabState,
      allViews: this.allViews
    };

    const podcastDrawerProps = {
      DrawerProps: {
        anchor: 'bottom',
        open: podcastPlaying,
        variant: 'persistent'
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
        anchor: 'right',
        open: isCartOpen,
        variant: 'persistent'
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
      content: siteContent.coverTab,
      email,
      createToDo: this.createToDo,
      checkItem: this.checkItem,
      handleDeleteToDo: this.handleDeleteToDo,
      toDoList,
      apiWaiting,
      refreshList: this.refreshList
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

      content: siteContent.comedyTab
    };
    const commerceProps = {
      products,
      client,
      addVariantToCart: this.addVariantToCart,
      content: siteContent.commerceTab
    };

    const tabProps = [coverProps, careerProps, comedyProps, commerceProps];

    return (
      <div>
        <NavBar {...navBarProps} />

        <div className={classes.nudgeTop} />

        <div style={{ overflow: 'hidden', width: '100vw', ...heightStyle }}>
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
