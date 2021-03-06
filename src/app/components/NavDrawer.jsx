import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import ProfileMini from 'components/ProfileMini';

import { withThemePicker } from 'app/ThemePickerProvider';

const styles = theme => ({
  topItem: {
    backgroundColor: theme.palette.gt.navy,
    // backgroundColor:'white',
    paddingLeft: 24,
    paddingRight: 24,
    minHeight: '64px!important',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('xs')]: {
      minHeight: '60px!important'
    }
  },

  menuGroup: {
    fontSize: '1.5rem',
    padding: 14
  },

  whiteBtn: {
    color: 'rgba(255,255,255,.9)',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, .5))'
  },

  colorTransform: {
    transition:
      'background-color 0.3s, transform 0.225s cubic-bezier(0, 0, 0.2, 1) 0s !important'
  },

  empty: {}
});

const NavDrawer = props => {
  const {
    DrawerProps,
    classes,
    profile,
    handleChange,
    toggleMenu,
    tabState,
    allViews,
    themeContext
  } = props;

  const { setTheme, allThemes, selectedTheme } = themeContext;

  const [opened, setOpened] = useState(false);

  return (
    <Drawer
      {...DrawerProps}
      /*
        overwriting transition style breaks the slide animation, this allows bg color
        tween for theme changing after opening is complete then removes the overwrite
       */
      classes={{
        paperAnchorLeft: opened ? classes.colorTransform : classes.empty
      }}
      SlideProps={{
        onEntered: () => setOpened(true),
        onExited: () => setOpened(false)
      }}
      /*
         the onEntered/onExited properties are documented in the core react docs
       */
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.topItem}
      >
        <Grid item>
          <IconButton
            edge="start"
            className={classes.whiteBtn}
            aria-label="menu"
            onClick={toggleMenu}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <ProfileMini profile={profile} profileVisible={false} />
        </Grid>
      </Grid>

      <Typography className={classes.menuGroup}>Navigation</Typography>
      <Divider />

      {allViews.map((view, idx) => (
        <div key={'item-' + view.shortName}>
          <MenuItem
            selected={tabState === idx}
            onClick={e => handleChange(e, idx)}
          >
            {view.name}
          </MenuItem>
          <Divider />
        </div>
      ))}

      <Typography className={classes.menuGroup}>Themes</Typography>
      <Divider />

      {allThemes.map(theme => (
        <div key={'item-' + theme.shortName}>
          <MenuItem
            selected={selectedTheme === theme.shortName}
            onClick={() => {
              setTheme(theme.shortName);
            }}
          >
            {theme.name}
          </MenuItem>
          <Divider />
        </div>
      ))}
    </Drawer>
  );
};

NavDrawer.propTypes = {
  DrawerProps: PropTypes.object,
  allViews: PropTypes.array,
  classes: PropTypes.object,
  handleChange: PropTypes.func,
  profile: PropTypes.object,
  tabState: PropTypes.number,
  themeContext: PropTypes.object,
  toggleMenu: PropTypes.func
};

export default withThemePicker(withStyles(styles)(NavDrawer));
