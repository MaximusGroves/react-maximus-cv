import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { withTheme, withStyles } from '@material-ui/core/styles';

import { useSpring, animated } from 'react-spring';
import CrossFadeImage from 'react-crossfade-image';
import classNames from 'classnames';

import { writeImgUrl } from 'helpers';

const styles = theme => ({
  miniProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    transition: 'transform  0.3s',
    marginRight: 'auto',
    paddingRight: 4
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
      marginLeft: 0
    }
  },

  hidePhoto: {
    display: 'none'
  }
});

const ProfileMini = props => {
  const { classes, profile, profileVisible, theme, isNavBar } = props;

  const springStyle = useSpring({
    transform: `translateY(${profileVisible ? 100 : 0}px)`,
    config: { duration: 150 }
  });

  const miniImgPath = theme.images.miniProfile;

  return (
    <animated.div
      className={classNames(classes.miniProfile, classes.className)}
      style={springStyle}
    >
      <div
        className={
          isNavBar && window.innerWidth < 374 ?
            classNames(classes.avatar, classes.hidePhoto) :
            classes.avatar
        }
      >
        <CrossFadeImage src={writeImgUrl(miniImgPath)} />
      </div>
      <Typography variant="h2">{profile.name}</Typography>
    </animated.div>
  );
};

ProfileMini.propTypes = {
  classes: PropTypes.object,
  isNavBar: PropTypes.bool,
  profile: PropTypes.object,
  profileVisible: PropTypes.bool,
  theme: PropTypes.object
};

export default withTheme(withStyles(styles)(ProfileMini));
