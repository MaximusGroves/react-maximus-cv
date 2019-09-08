import React from 'react';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Fade from '@material-ui/core/Fade';

import withWidth from '@material-ui/core/withWidth';
import { withStyles, withTheme } from '@material-ui/core/styles';


const style = theme => ({
  rootPaper:{
    height:'90%',
    width:'90%',
    margin:'auto',

  },

  homeText: {
    textAlign: 'center',
    // display:'flex',
    padding:50,
  }

});


export class Home extends React.PureComponent {
  constructor (props) {
    super(props);
  }

  componentDidMount () {

  }

  render () {
    const { classes } = this.props;

    return (
      <Paper className={classes.rootPaper}>
        <Typography variant="h1" className = {classes.homeText}>
          New Thing Baby
        </Typography>
      </Paper>
    );
  }
}


export default withStyles(style)(Home);
