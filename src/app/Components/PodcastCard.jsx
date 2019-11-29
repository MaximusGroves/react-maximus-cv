import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { withStyles } from '@material-ui/core/styles';

import Moment from 'react-moment';

const style = theme => ({
  rootPaper: {
    margin: 'auto'
  },


  forceNoWrap: {
    whiteSpace: 'nowrap',
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  expandedContent: {
    height: '100%!important',
    paddingBottom: 20,
    maxHeight: 400,
    overflowY: 'auto'
  },

  podcastContent: {
    // "fontSize": 20,
    // lineHeight:'1.5rem',
    "fontFamily": 'roboto',

    '& figure': {
      '& img': {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '100%'
      }
    }
  },
  playBtn: {
    marginLeft: -18,
    marginRight: 8
  }

  // expandedContent:{
  //   height: '100%!important',
  // },
});

const PodcastCard = props => {
  const {
    classes,
    podcast,
    idx,
    audioPlaying,
    audioUrl
  } = props;

  const playClicked = (evt, link, title) => {
    evt.stopPropagation();
    evt.preventDefault();
    props.setAudioUrl(link, title);
  };

  return (

    <ExpansionPanel
      key={'podcast' + idx}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >

        <IconButton
          onClick={evt => playClicked(evt, podcast.enclosure[0]['$'].url, podcast.title)}
          className={classes.playBtn}
        >
          {(audioPlaying && audioUrl === podcast.enclosure[0]['$'].url) ? <PauseIcon /> : <PlayArrow />}
        </IconButton>

        <Grid container direction="column" >

          <Grid item >
            <Typography variant="h6">
              {podcast.title}
            </Typography>

            <Typography variant="subtitle1">
              {podcast['itunes:duration']}
            </Typography>

          </Grid>
          <Grid item >
            <Typography variant="subtitle2" className={classes.forceNoWrap}>
              <Moment
                format="MMMM D YYYY"
                date={podcast.pubDate[0]}
              />
            </Typography>
          </Grid>
        </Grid>

      </ExpansionPanelSummary>

      <ExpansionPanelDetails
        className={classes.expandedContent}
        onScroll={e => {e.stopPropagation(); e.preventDefault();}}
      >
        <Typography
          dangerouslySetInnerHTML={{ __html: podcast["content:encoded"] }} className={classes.podcastContent}
        />
      </ExpansionPanelDetails>

    </ExpansionPanel>
  );
};

export default withStyles(style)(PodcastCard);
