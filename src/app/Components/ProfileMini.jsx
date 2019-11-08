import React from 'react';

import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import {useSpring, animated, config} from 'react-spring';
import { withTheme, withStyles } from '@material-ui/core/styles';

import CrossfadeImage from 'react-crossfade-image';

const styles = theme => ({
  miniProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    transition: 'transform  0.3s',
    marginRight: 'auto',
    paddingRight:4,
  },

  avatar: {
    boxShadow: '2px 2px 3px rgba(0,0,0,0.4)',
    width: 56,
    minWidth: 56,
    height: 56,
    borderRadius: 100,
    margin: '0 16px 0 4px',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      marginLeft:0,
    }
  },

  hidePhoto:{
    display:'none',
  }


});

const ProfileMini = props => {
  const { classes, profile, profileVisible, className, style, theme, isNavBar } = props;



  const springStyle = useSpring({transform:`translateY(${profileVisible ? 100 : 0}px)`, config: {duration:150} }  );


  return (
    <animated.div className={classnames(classes.miniProfile, classes.className)} style={springStyle}>
      <div className={(isNavBar && window.innerWidth < 374) ? classnames(classes.avatar, classes.hidePhoto) : classes.avatar}>
        <CrossfadeImage
          src={theme.images.profile}
        />
      </div>
      <Typography variant="h5">
        {profile.name}
      </Typography>
    </animated.div>
  );
};

export default withTheme(withStyles(styles)(ProfileMini));
