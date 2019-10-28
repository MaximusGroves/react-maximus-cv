import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


import ProfileMini from './ProfileMini';


const NavBar = props => {
  const {
    TabsProps,
    classes,
    miniProfileClasses,
    profile,
    profileVisible,
    cartTotal,
    toggleMenu,
    toggleCart,
    allViews
  } = props;


  return (
    <AppBar variant="fixed" >
      <Toolbar >
        <IconButton edge="start" className={classes.whiteBtn} aria-label="menu" onClick={toggleMenu}>
          <MenuIcon />
        </IconButton>

        <ProfileMini profile={profile} profileVisible={profileVisible} classes={miniProfileClasses} />

        <Tabs
          {...TabsProps}
        >
          {allViews.map((view) => (
            <Tab label={view.shortName} />
          ))}
        </Tabs>
        <IconButton edge="end" className={classes.whiteBtn} aria-label="cart" onClick={toggleCart}>
          <Badge badgeContent={cartTotal} color="secondary">
            <ShoppingCartIcon/>
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
