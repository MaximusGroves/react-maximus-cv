import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';

import ProfileMini from './ProfileMini';
import MenuItem from '@material-ui/core/MenuItem';


const NavDrawer = props => {
  const {
    DrawerProps,
    miniProfileClasses,
    classes,
    profile,
    handleChange,
    toggleMenu,
    tabState,
    allViews,
  } = props;


  return (
    <Drawer
      {...DrawerProps}
    >
      <Grid container direction="row" alignItems="center" className={classes.topItem}>
        <Grid item>
          <IconButton edge="start" className={classes.whiteBtn} aria-label="menu" onClick={toggleMenu}>
            <CloseIcon/>
          </IconButton>
        </Grid>
        <Grid item>
          <ProfileMini profile={profile} profileVisible={false} classes={miniProfileClasses} />
        </Grid>
      </Grid>

      <Typography className={classes.menuGroup}>
        Navigation
      </Typography>
      <Divider />

      {allViews.map((view, idx)=>(
        <div>
          <MenuItem selected={tabState === idx} onClick={e => handleChange(e, idx)}>
            {view.name}
          </MenuItem>
          <Divider />
        </div>
      ))}

      <Typography className={classes.menuGroup}>
        Themes
      </Typography>
      <MenuItem selected >
        School Spirit
      </MenuItem>
      <Divider />
      <MenuItem selected={false} >
        Night Game
      </MenuItem>

    </Drawer>
  );
};

export default NavDrawer;
