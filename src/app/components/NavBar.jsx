import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ProfileMini from './ProfileMini';

const NavBar = props => {
  const {
    TabsProps,
    classes,
    profile,
    tabState,
    cartTotal,
    toggleMenu,
    toggleCart,
    allViews

    // onSignIn,
    // onSignOut,
    // authenticated,
    // user
  } = props;

  return (
    <AppBar variant="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.whiteBtn}
          aria-label="menu"
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>

        <ProfileMini
          profile={profile}
          profileVisible={tabState === 0}
          isNavBar
        />

        {/*<Button onClick={onSignIn}>*/}
        {/*Login*/}
        {/*</Button>*/}

        {/*<Button onClick={onSignOut}>*/}
        {/*Logout*/}
        {/*</Button>*/}

        {/*<Typography>*/}
        {/*{authenticated ? "logged in" : "logged out"}*/}
        {/*</Typography>*/}

        <Tabs {...TabsProps}>
          {allViews.map(view => (
            <Tab label={view.shortName} key={'tab-' + view.shortName} />
          ))}
        </Tabs>
        <IconButton
          edge="end"
          className={classes.cartBtn}
          aria-label="cart"
          onClick={toggleCart}
        >
          <Badge badgeContent={cartTotal} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  TabsProps: PropTypes.object,
  allViews: PropTypes.array,
  cartTotal: PropTypes.number,
  classes: PropTypes.object,
  profile: PropTypes.object,
  tabState: PropTypes.number,
  toggleCart: PropTypes.func,
  toggleMenu: PropTypes.func
};

export default NavBar;
