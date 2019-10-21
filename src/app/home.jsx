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
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableViews from 'react-swipeable-views';

import Fade from '@material-ui/core/Fade';

import withWidth from '@material-ui/core/withWidth';


import * as rssParser from 'react-native-rss-parser';

import Career from './career.jsx';


// import profileImg from '../assets/images/profile.jpg';
import resumeUrl from '../assets/data/resume.json';

import { withStyles, withTheme } from '@material-ui/core/styles';


const style = theme => ({
  root: {

  },

  menuButton:{
    color:'white',
  },

  // offset:{
  //   ...theme.mixins.toolbar,
  //   flexGrow: 1
  // }

  mudgeTop:{
    marginTop:114,
  },

  tabIndicator:{
    backgroundColor:'white',
  },

  tabColor:{
    color:'white',
  },

  tabRoot:{
    marginLeft:'auto',
  }


});


class Home extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {

      experience:[],
      profile:{
        name:"",
        tagline:"",
        image:"",
      },
      education:{
        college:"",
        graduation:"",
        degree:"",
      },

      tabState:0,

    };
  }


  componentDidMount() {


    fetch(resumeUrl, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      response.json().then(resumeData => {
        const {experience, profile, education} = resumeData;
        this.setState({ experience, profile, education});
      })}
    );

    this.getFeed();
  }

  handleChange= (evt, val) =>{
    this.setState({tabState:val});
  }

  handleChangeIndex= (index) =>{
    this.setState({tabState:index});
  }

  getFeed = () => {
    fetch('http://www.nasa.gov/rss/dyn/breaking_news.rss')
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        console.log(rss.title);
        console.log(rss.items.length);
      });
  }

  render () {
    const { classes, theme } = this.props;
    const { over, experience, profile, education, tabState } = this.state;

    return (
      <div className={classes.mudgeTop}>
        <AppBar position="fixed" >
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
            {/*<Typography variant="h6" className={classes.title}>*/}
              {/*News*/}
            {/*</Typography>*/}
            <Tabs
              value={tabState}
              onChange={this.handleChange}
              classes={{indicator:classes.tabIndicator, root:classes.tabRoot}}
              variant="fullWidth"
            >
              <Tab label="Career" classes={{root:classes.tabColor}}  />
              <Tab label="Comedy"  classes={{root:classes.tabColor}} />
              <Tab label="Commerce"  classes={{root:classes.tabColor}} />
            </Tabs>



          </Toolbar>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabState}
          onChangeIndex={this.handleChangeIndex}
        >
          <div value={tabState} index={0} dir={theme.direction}>
            <Career profile={profile} education={education} experience={experience}/>
          </div>
          <div value={tabState} index={1} dir={theme.direction}>
            <Career profile={profile} education={education} experience={experience}/>
          </div>
          <div value={tabState} index={2} dir={theme.direction}>
            <Career profile={profile} education={education} experience={experience}/>
          </div>
        </SwipeableViews>


      </div>
    );
  }
}


export default withTheme(withStyles(style)(Home));
