import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';

import ProfileMini from './ProfileMini';
import MenuItem from '@material-ui/core/MenuItem';

import {withThemePicker} from '../ThemePickerProvider';


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
    themeContext,
  } = props;

  const {setTheme, allThemes, selectedTheme} = themeContext;

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
        <div key={'item-'+view.shortName}>
          <MenuItem selected={tabState === idx}  onClick={e => handleChange(e, idx)}>
            {view.name}
          </MenuItem>
          <Divider />
        </div>
      ))}

      <Typography className={classes.menuGroup}>
        Themes
      </Typography>
      <Divider />

      {allThemes.map((theme, idx)=>(
        <div key={'item-'+theme.shortName}>
          <MenuItem selected={selectedTheme === theme.shortName}  onClick={e => setTheme(theme.shortName)}>
            {theme.name}
          </MenuItem>
          <Divider />
        </div>
      ))}

    </Drawer>
  );
};

export default withThemePicker(NavDrawer);
