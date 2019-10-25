import React from 'react';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import PlayArrow from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';


import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import Fade from '@material-ui/core/Fade';

import withWidth from '@material-ui/core/withWidth';

import IconButton from '@material-ui/core/IconButton';
import Moment from 'react-moment';
import ReactPlayer from 'react-player';
import Iframe from 'react-iframe';


import { withStyles, withTheme } from '@material-ui/core/styles';


const style = theme => ({
  root: {
    // width:'100%',
    height: 'calc(100% - 100px)',
    display: 'flex',
    justifyContent: 'center',
    padding: 50
  },

  fancyBlock: {
    paddingLeft: 106
    // color: 'white',
    // background: #0e8dbc;
    // letterSpacing: '.15em',
    // textShadow: '1px -1px 0 #767676, -1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, -4px 8px 1px #7b7a7a, -5px 10px 1px #7f7d7d, -6px 12px 1px #828181, -7px 14px 1px #868585, -8px 16px 1px #8b8a89, -9px 18px 1px #8f8e8d, -10px 20px 1px #949392, -11px 22px 1px #999897, -12px 24px 1px #9e9c9c, -13px 26px 1px #a3a1a1, -14px 28px 1px #a8a6a6, -15px 30px 1px #adabab, -16px 32px 1px #b2b1b0, -17px 34px 1px #b7b6b5, -18px 36px 1px #bcbbba, -19px 38px 1px #c1bfbf, -20px 40px 1px #c6c4c4, -21px 42px 1px #cbc9c8, -22px 44px 1px #cfcdcd, -23px 46px 1px #d4d2d1, -24px 48px 1px #d8d6d5, -25px 50px 1px #dbdad9, -26px 52px 1px #dfdddc, -27px 54px 1px #e2e0df, -28px 56px 1px #e4e3e2',
  },


  rootPaper: {
    margin: 'auto'
    // padding: 50,
    // '&:hover':{
    //   backgroundColor:theme.palette.gray.f5,
    // },
    // transition: 'padding ease-out 0.2s, box-shadow ease-out 0.2s'
  },

  expandableSummary: {
    '&:hover': {
      backgroundColor: theme.palette.gray.f5
    },
    "transition": 'backgroundColor ease-out 0.2s, '
  },

  namePaper: {
    margin: 50,
    padding: 50
    // backgroundColor:theme.palette.gt.gold,
    // '&:hover':{
    //   padding:55,
    // },
    // transition: 'padding ease-out 0.2s, box-shadow ease-out 0.2s'
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
    // display:'flex',
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
    padding: 24
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
    // maxHeight: 600,
    // overflowY: 'auto',
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

  firstCard:{
    // marginTop:0,
  }

});


class Comedy extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      hover: false
    };
  }


  componentDidMount () {

  }

  testTitle = (title, content) => {
    return content.indexOf('<p>' + title.toString().substring(0, (title.length - 3))) !== 0;
  }

  playClicked = (evt, link) => {
    evt.stopPropagation();
    evt.preventDefault();
    this.props.setAudioUrl(link);
  }

  render () {
    const { classes, mediumPosts, podcasts, audioPlaying, audioUrl } = this.props;
    const { over } = this.state;

    // console.log(mediumPosts)

    console.log(podcasts);

    return (
      <div >

        <Paper elevation={3} className={classes.firstCard}>

          <Typography variant="h4">
          Stand up
          </Typography>

          <Typography className={classes.headingPadding}>
          Most of my material was written for vulgar, late-night clubs, so most of it will only be shared in vulgar, late night clubs, but there is at least one clean set on record.
          </Typography>

          <div
            className={classes.maxwidth100}
          >
            <ReactPlayer
              url="https://www.youtube.com/watch?v=mSehbyNWjmM"
              className={classes.maxWidth100}
            />
          </div>

        </Paper>
        <Paper elevation={3} >

          <Typography variant="h4" className={classes.headingPadding}>
          Improv
          </Typography>

          <Typography className={classes.headingPadding}>
          asdf
          </Typography>

          <div
            className={classes.maxwidth100}
          >

            <Iframe
              url="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FActionShowStudios%2Fvideos%2F455247618401951%2F&show_text=0&width=640"
              width={640}
              height={362}
              className={classes.maxWidth100}
            />

          </div>
          {/*<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FActionShowStudios%2Fvideos%2F455247618401951%2F&show_text=0&width=560" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>*/}

        </Paper>
        <Paper elevation={3} >


          <Typography variant="h4" className={classes.headingPadding}>
          Writing
          </Typography>

          {mediumPosts.map((story, idx) =>

            this.testTitle(story.title, story['content:encoded'][0]) &&
        <ExpansionPanel
          key={'story' + idx}
          classes={{ root: classes.rootPaper, expanded: classes.paperExpanded }}
          TransitionProps={{ unmountOnExit: true }}
        >
          <ExpansionPanelSummary
            className={classes.expandableSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container direction="row" alignItems="center" justify="space-between" >

              <Grid item xs={12} sm>

                <Typography variant="h6">
                  {story.title}
                </Typography>

                <Typography variant="subtitle1">
                  {story.category && story.category.join(', ')}
                </Typography>

              </Grid>

              <Grid item >
                <Typography variant="subtitle2" className={classes.forceNoWrap}>
                  <Moment
                    format="MMMM D YYYY"
                    date={story.pubDate[0]}
                  />
                </Typography>
              </Grid>
            </Grid>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expandedContent}>

            <div dangerouslySetInnerHTML={{ __html: story["content:encoded"] }} className={classes.mediumContent}/>

          </ExpansionPanelDetails>
        </ExpansionPanel>


          )}
        </Paper>
        <Paper elevation={3} >

          <Typography variant="h4" >
          Podcasts
          </Typography>

          <div className={classes.podcastGroup}>

            {podcasts.map((podcast, idx) =>

              (<ExpansionPanel
                key={'podcast' + idx}
                classes={{ root: classes.rootPaper, expanded: classes.paperExpanded }}
                TransitionProps={{ unmountOnExit: true }}
              >
                <ExpansionPanelSummary
                  className={classes.expandableSummary}
                  expandIcon={<ExpandMoreIcon />}
                >

                  <IconButton onClick={evt => this.playClicked(evt, podcast.title)} className={classes.playBtn}>
                    {(audioPlaying && audioUrl === podcast.title) ? <PauseIcon /> :  <PlayArrow />}
                  </IconButton>

                  <Grid container direction="column">

                    <Grid item>
                      <Typography variant="h6">
                        {podcast.title}
                      </Typography>

                      <Typography variant="subtitle1">
                        {podcast['itunes:duration']}
                      </Typography>

                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2" className={classes.forceNoWrap}>
                        <Moment
                          format="MMMM D YYYY"
                          date={podcast.pubDate[0]}
                        />
                      </Typography>
                    </Grid>
                  </Grid>

                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expandedContent}>
                  <div dangerouslySetInnerHTML={{ __html: podcast["content:encoded"] }} className={classes.mediumContent}/>
                </ExpansionPanelDetails>
              </ExpansionPanel>)


            )}

          </div>
        </Paper>

      </div>
    );
  }
}


export default withStyles(style)(Comedy);
