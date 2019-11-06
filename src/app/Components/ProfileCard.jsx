import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import gtLogo from '../../assets/images/gt.png';
import WorkIcon from '@material-ui/icons/BusinessCenterRounded';

import CrossfadeImage from 'react-crossfade-image';

import { withStyles, withTheme } from '@material-ui/core/styles';

const style = theme => ({
  media: {
    width: 300,
    height: 300,
    borderRadius: 1000,
    overflow:'hidden',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    [theme.breakpoints.down('xs')]: {
      width: 200,
      height: 200,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },

  photoItem: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingBottom: '0!important'
    }
  },

  fancyBlock: {
    paddingLeft: 110,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      padding: 0
    }
  },

  bottomPadding: {
    paddingBottom: 24
  },

  gtLogo: {
    maxWidth: 88
  },

  centerMargin: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  workIcon: {
    fontSize: '4rem',
    width: 88,
    marginTop: -20,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem'
    }
  },
})


const ProfileCard = props => {
  const { classes, profile, education, theme } = props;

  return (

    <Paper elevation={3} >

      <Grid container direction="row" spacing={6} >
        <Grid item className={classes.photoItem}>
          <div className={classes.media}>
              <CrossfadeImage
                // style={{...classes.media}}
                src={theme.images.profile}
              />
          </div>
        </Grid>

        <Grid item xs>

          <Typography variant="h1" className={classNames(classes.fancyBlock, classes.bottomPadding)} >
            {profile.name}
          </Typography>

          <Grid container direction="column" justify="space-around">

            <Grid item container spacing={3} direction="row" alignItems="center">

              <Grid item className={classes.centerMargin}>
                <WorkIcon className={classes.workIcon}/>
              </Grid>
              <Grid item xs={12} sm className={classes.bottomPadding}>
                <Typography variant="h3" className={classes.bottomPadding}>
                  {profile.tagline}
                </Typography>
              </Grid>

            </Grid>


            <Grid item container spacing={3} direction="row" alignItems="center">

              <Grid item className={classes.centerMargin}>
                <img src={gtLogo} className={classes.gtLogo}/>
              </Grid>
              <Grid item xs={12} sm >
                <Typography variant="h3" >
                  {education.degree} <br/> {"Graduated " + education.graduation}
                </Typography>
              </Grid>

            </Grid>

          </Grid>

        </Grid>
      </Grid>

    </Paper>

  );
};

export default withTheme(withStyles(style)(ProfileCard));

