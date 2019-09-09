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
  root: {
    // width:'100%',
    height: 'calc(100% - 100px)',
    display: 'flex',
    justifyContent: 'center',
    padding: 50
  },

  rootPaper: {
    margin: 'auto',
    padding: 50
  },

  homeText: {
    textAlign: 'center'
    // display:'flex',
  }

});


class Home extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      hover: false
    };
  }


  componentDidMount () {

  }

  hoverOver = (evt) => {
    this.setState({ over: true });
  }

  hoverOut = (evt) => {
    this.setState({ over: false });
  }

  render () {
    const { classes } = this.props;
    const { over } = this.state;

    return (
      <div className={classes.root}>
        <Paper elevation={over ? 24 : 3} className={classes.rootPaper} onMouseOver={this.hoverOver} onMouseOut={this.hoverOut}>
          <Typography variant="h1" className={classes.homeText}>
            New Thing Baby
          </Typography>
        </Paper>
      </div>
    );
  }
}


export default withStyles(style)(Home);
