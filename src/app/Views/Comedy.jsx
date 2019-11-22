import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ReactPlayer from 'react-player';
import Iframe from 'react-iframe';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import MediumCard from '../Components/MediumCard';
import PodcastCard from '../Components/PodcastCard';

import { animated } from 'react-spring';
import { Transition } from 'react-spring/renderprops';

import { withStyles, withTheme } from '@material-ui/core/styles';


const style = theme => ({
  root: {
    height: 'calc(100% - 100px)',
    display: 'flex',
    justifyContent: 'center',
    padding: 50
  },

  fancyBlock: {
    paddingLeft: 106
  },

  rootPaper: {
    margin: 'auto'
  },

  namePaper: {
    margin: 50,
    padding: 50
  },

  paperExpanded: {
    margin: 'auto!important'
  },

  expandedContent: {
    height: '100%!important',
    paddingBottom: 100,
    maxHeight: 400,
    overflowY: 'auto'
  },

  homeText: {
    textAlign: 'center'
  },

  media: {
    width: 300,
    height: 300,
    borderRadius: 1000
  },

  forceNoWrap: {
    whiteSpace: 'nowrap',
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  bottomPadding: {
    paddingBottom: 24
  },

  headingPadding: {
    padding: '0 24px 24px'
  },

  gtLogo: {
    maxWidth: 88
  },

  workIcon: {
    fontSize: '4rem',
    width: 88,
    marginTop: -20,
    color: theme.palette.gt.gold
  },

  mediumContent: {
    "fontSize": 20,
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

  podcastGroup: {
    padding: 2,
    margin: -2
  },

  playBtn: {
    marginLeft: -18,
    marginRight: 8
  },

  maxWidth100: {
    maxWidth: '100%'
  },

  dateSection: {
    marginLeft: "auto",
    [theme.breakpoints.down('xs')]: {
      marginLeft: "unset"
    }
  },

  favoritesSwitch: {
    marginLeft: 10
  },

  favoritesSelected: {
    fontWeight: 'bold',
    paddingBottom: 0
  },
  favoritesDeselected: {
    fontWeight: 'normal',
    paddingBottom: 0
  },

  descriptionText: {
    paddingTop: 16,
  }

});


const blankContent = {
  standup: {
    title: "",
    description: ""
  },
  improv: {
    title: '',
    description: ''
  },
  writing: {
    title: '',
    description: ''
  },
  podcasts: {
    title: '',
    description: ''
  },
};


const Comedy = props => {
  const {
    classes,
    mediumPosts,
    podcasts,
    audioPlaying,
    audioUrl,
    favoritePodcasts,
    setAudioUrl,
    filteringFavorites,
    handleFavoritesChecked,
    content,
    className,
    viewRef
  } = props;

  const useContent = content || blankContent;

  const favPods = podcasts ? podcasts.filter(pod => {
    return favoritePodcasts.find(fav => {
      return pod.title[0].substring(0, fav.length) === fav;
    }) !== undefined;
  }) : [];

  const showPods = filteringFavorites ? favPods : podcasts;

  const testTitle = (title, content) => {
    return content.indexOf('<p>' + title.toString().substring(0, (title.length - 3))) !== 0;
  };

  const displayItems = { items: ['item1', 'item2', 'item3'] };

  return (

    <div className={className} ref={viewRef} >

      <Paper elevation={3} >

        <Typography variant="h4" >
          {useContent.writing.title}
        </Typography>
        <Typography variant="body2">
          {useContent.writing.description}
        </Typography>

        {mediumPosts.map((story, idx) =>
          testTitle(story.title, story['content:encoded'][0]) && <MediumCard story={story} idx={idx} key={'mediumCard-' + idx} />
        )}
      </Paper>

      <Paper elevation={3} >

        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Typography variant="h4" >
              {useContent.podcasts.title}
            </Typography>
          </Grid>
          <Grid item>
            <FormControlLabel
              value="end"
              control={
                <Switch
                  color="primary"
                  checked={filteringFavorites}
                  onChange={handleFavoritesChecked('filteringFavorites')}
                  className={classes.favoritesSwitch}
                />
              }
              label="My Favorites"
              labelPlacement="bottom"
              classes = {{ label: (filteringFavorites ? classes.favoritesSelected : classes.favoritesDeselected) }}
            />
          </Grid>
        </Grid>

        <Typography variant="body2" className={classes.descriptionText}>
          {useContent.podcasts.description}
        </Typography>

        <div className={classes.podcastGroup}>

          {showPods.map((podcast, idx) => (
            <PodcastCard
              podcast={podcast}
              idx={idx}
              key={'podcastCard-' + idx}
              audioPlaying={audioPlaying}
              audioUrl={audioUrl}
              setAudioUrl={setAudioUrl}
            />
          ))}
        </div>
      </Paper>

      <Paper elevation={3} >

        <Typography variant="h4">
          {useContent.standup.title}
        </Typography>

        <Typography variant="body2">
          {useContent.standup.description}
        </Typography>

        <div className={classes.maxwidth100}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=mSehbyNWjmM"
            className={classes.maxWidth100}
          />
        </div>
      </Paper>

      <Paper elevation={3} >
        <Typography variant="h4" >
          {useContent.improv.title}
        </Typography>
        <Typography variant="body2">
          {useContent.improv.description}
        </Typography>
        <div className={classes.maxwidth100} >
          <Iframe
            url="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FActionShowStudios%2Fvideos%2F455247618401951%2F&show_text=0&width=640"
            width={640}
            height={362}
            className={classes.maxWidth100}
          />
        </div>
      </Paper>

    </div>
  );
};


export default withStyles(style)(Comedy);
