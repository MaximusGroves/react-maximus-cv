import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { withStyles } from '@material-ui/core/styles';

import ReactPlayer from 'react-player';

import Duration from 'components/Duration';

const styles = () => ({
  currentAudio: {
    color: 'rgba(255,255,255,.9)',
    marginLeft: 18,
    textShadow: '1px 1px 3px rgba(0,0,0,0.9)',
    fontSize: '1.2rem'
  },

  gridTitle: {
    width: 'calc(100% - 240px)'
  },

  verticalAutoMargin: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  whiteBtn: {
    color: 'rgba(255,255,255,.9)',
    filter: 'drop-shadow( 2px 2px 2px rgba(0, 0, 0, .5))'
  }
});

const PodcastDrawer = props => {
  const {
    DrawerProps,
    PlayerProps,
    classes,
    playPause,
    closePlayer,
    audioTitle
  } = props;

  const { playing, duration, played } = PlayerProps;

  const isLoading = duration === 0;

  return (
    <Drawer {...DrawerProps}>
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.verticalAutoMargin}
      >
        <Grid item>
          <IconButton onClick={playPause} disabled={isLoading}>
            {playing ? (
              <PauseIcon className={classes.whiteBtn} />
            ) : (
              <PlayArrow className={classes.whiteBtn} />
            )}
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={closePlayer} disabled={isLoading}>
            <StopIcon className={classes.whiteBtn} />
          </IconButton>
        </Grid>
        <Grid item zeroMinWidth className={classes.gridTitle}>
          <Typography className={classes.currentAudio} noWrap>
            {isLoading ? 'Loading Podcast...' : audioTitle}
          </Typography>
          <Typography className={classes.currentAudio} noWrap>
            <Duration seconds={duration * played} /> /{' '}
            <Duration seconds={duration} />
          </Typography>
        </Grid>

        <ReactPlayer {...PlayerProps} />
      </Grid>
    </Drawer>
  );
};

PodcastDrawer.propTypes = {
  DrawerProps: PropTypes.object,
  PlayerProps: PropTypes.object,
  audioTitle: PropTypes.string,
  classes: PropTypes.object,
  closePlayer: PropTypes.func,
  playPause: PropTypes.func
};

export default withStyles(styles)(PodcastDrawer);
