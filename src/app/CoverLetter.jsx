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

import Fade from '@material-ui/core/Fade';

import withWidth from '@material-ui/core/withWidth';


// import profileImg from '../assets/images/profile.jpg';
// import resumeUrl from '../assets/data/resume.json';

import gtLogo from '../assets/images/gt.png';

import WorkIcon from '@material-ui/icons/BusinessCenterRounded';

import Profile from './Profile';

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

  nameContainer: {
    marginBottom: 25
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

  sectionPadding: {
    padding: 5
  },

  paperExpanded: {
    margin: 'auto!important'
  },

  expandedContent: {
    height: '100%!important',
    paddingBottom: 100
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


  gtLogo: {
    maxWidth: 88
  },

  workIcon: {
    fontSize: '4rem',
    width: 88,
    marginTop: -20,
    color: theme.palette.gt.gold
  },

  smallText: {
    fontSize: '1rem'
  },

  firstCard:{
    marginTop:0,
  },

  headingPadding: {
    padding: '0 24px 24px',
  },

});


class Career extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      hover: false
    };
  }


  componentDidMount () {

  }



  render () {
    const { classes, experience, profile, education, animationRef } = this.props;
    const { over } = this.state;

    return (

      <div>

        <Profile profile={profile} education={education} animationRef={animationRef} />

        <Paper elevation={3} className={classes.firstCard}>

          <Typography variant="h4" >
            Welcome
          </Typography>

          <Typography className={classes.headingPadding}>
            Thank you for visiting my portfolio.
          </Typography>

        </Paper>

      </div>
    );
  }
}


export default withStyles(style)(Career);
