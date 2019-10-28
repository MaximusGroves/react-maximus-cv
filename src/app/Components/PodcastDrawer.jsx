import React from 'react';
import ReactPlayer from 'react-player';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import Duration from './Duration';

const PodcastDrawer = props => {
  const {
    DrawerProps,
    PlayerProps,
    classes,
    playPause,
    closePlayer,
    audioTitle,
  } = props;

  const { playing, duration, played } = PlayerProps;

  const isLoading = (duration === 0);

  return (
    <Drawer
      {...DrawerProps}
    >

      <Grid container direction="row" alignItems="center" className={classes.verticalAutoMargin}>

        <Grid item>

          <IconButton onClick={playPause} disabled={isLoading}>
            {playing ? <PauseIcon className={classes.whiteBtn}/> : <PlayArrow className={classes.whiteBtn}/> }
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={closePlayer} disabled={isLoading}>
            <StopIcon className={classes.whiteBtn}/>
          </IconButton>
        </Grid>
        <Grid item zeroMinWidth className={classes.gridTitle}>
          <Typography className={classes.currentAudio} noWrap >
            {isLoading ? "Loading Podcast..." : audioTitle }
          </Typography>
          <Typography className={classes.currentAudio} noWrap >
            <Duration seconds={duration * played} /> / <Duration seconds={duration} />
          </Typography>
        </Grid>

        <ReactPlayer
          {...PlayerProps}
        />

      </Grid>
    </Drawer>
  );
};

export default PodcastDrawer;
