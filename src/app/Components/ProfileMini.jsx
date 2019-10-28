import React from 'react';

import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';


const ProfileMini = props => {
  const { classes, profile, profileVisible, className } = props;

  return (
    <div className={profileVisible ? classNames(classes.miniProfile, classes.scrollUp) : classes.miniProfile}>
      <img src={'/img/' + profile.image} className={classes.avatar}/>
      <Typography variant="h5">
        {profile.name}
      </Typography>
    </div>
  );
};

export default ProfileMini;
