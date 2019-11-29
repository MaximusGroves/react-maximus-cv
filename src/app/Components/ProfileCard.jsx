import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MailIcon from '@material-ui/icons/MailOutline';
import DownloadIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import WorkIcon from '@material-ui/icons/BusinessCenterRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withStyles, withTheme } from '@material-ui/core/styles';

import CrossFadeImage from 'react-crossfade-image';
import classNames from 'classnames';

import gtLogo from 'assets/images/gt.png';

const style = theme => ({
  media: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    overflow: 'hidden',
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

  leftNudge: {
    padding: '16px 10% 0 100px',
    [theme.breakpoints.down('sm')]: {
      padding: '16px 15% 0'
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 380,
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '16px 0 0'
    }
  }
});

const ProfileCard = props => {
  const { classes, profile, education, theme, email, repo } = props;

  return (
    <Paper elevation={3}>
      <Grid container direction="row" spacing={6}>
        <Grid item className={classes.photoItem}>
          <div className={classes.media}>
            <CrossFadeImage src={theme.images.profile} />
          </div>
        </Grid>

        <Grid item xs>
          <Typography
            variant="h1"
            className={classNames(classes.fancyBlock, classes.bottomPadding)}
          >
            {profile.name}
          </Typography>

          <Grid container direction="column" justify="space-around">
            <Grid
              item
              container
              spacing={3}
              direction="row"
              alignItems="center"
            >
              <Grid item className={classes.centerMargin}>
                <WorkIcon className={classes.workIcon} />
              </Grid>
              <Grid item xs={12} sm className={classes.bottomPadding}>
                <Typography variant="h3" className={classes.bottomPadding}>
                  {profile.tagline}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              container
              spacing={3}
              direction="row"
              alignItems="center"
            >
              <Grid item className={classes.centerMargin}>
                <img src={gtLogo} className={classes.gtLogo} />
              </Grid>
              <Grid item xs={12} sm>
                <Typography variant="h3">
                  {education.degree} <br />{' '}
                  {'Graduated ' + education.graduation}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              container
              spacing={3}
              direction="row"
              alignItems="center"
              justify="space-between"
              className={classes.leftNudge}
            >
              <Grid item>
                <a href={`mailto:${email}`}>
                  <Tooltip title="Email Me">
                    <IconButton>
                      <MailIcon />
                    </IconButton>
                  </Tooltip>
                </a>
              </Grid>
              <Grid item>
                <a href={'/data/MaxGrovesResume2019.pdf'} target="_blank">
                  <Tooltip title="Download My Resume">
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                </a>
              </Grid>

              <Grid item>
                <a href={repo} target="_blank">
                  <Tooltip title="View on GitHub">
                    <IconButton>
                      <ExitToAppIcon />
                    </IconButton>
                  </Tooltip>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withTheme(withStyles(style)(ProfileCard));
