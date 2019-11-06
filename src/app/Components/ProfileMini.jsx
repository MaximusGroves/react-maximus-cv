import React from 'react';

import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import {useSpring, animated, config} from 'react-spring';
import { withTheme } from '@material-ui/core/styles';

import CrossfadeImage from 'react-crossfade-image';



const ProfileMini = props => {
  const { classes, profile, profileVisible, className, style, theme } = props;

  // console.log('vis', profileVisible);

  const springStyle = useSpring({transform:`translateY(${profileVisible ? 100 : 0}px)`, config: {duration:150} }  );


  return (
    <animated.div className={classnames(classes.miniProfile, classes.className)} style={springStyle}>
      <div className={classes.avatar}>
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

export default withTheme(ProfileMini);
