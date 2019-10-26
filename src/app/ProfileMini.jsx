import React from 'react';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';


import { withStyles, withTheme } from '@material-ui/core/styles';


const style = theme => ({
  root: {
    // width:'100%',
    height: 'calc(100% - 100px)',
    display: 'flex',
    justifyContent: 'center',
    padding: 50
  },

  miniProfile:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    transition:'transform  0.3s',
    marginRight:'auto',
  },

  media: {
    boxShadow: '2px 2px 3px rgba(0,0,0,0.4)',
    width: 56,
    height: 56,
    borderRadius: 1000,
    margin:'0 16px',
  },

  scrollUp:{
    transform:'translateY(100px)',
  },

  nameColor: {
    color: 'white',
    textShadow: '2px 2px 3px rgba(0,0,0,0.4)',
    fontSize: '2.2rem',
    lineHeight: '2rem',
    [theme.breakpoints.down('xs')]: {
      fontSize:'1rem',
      lineHeight: '1.5rem',
    }
  },

});


class Profile extends React.PureComponent {
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
    const { classes, profile, profileVisible, className} = this.props;

    return (

      <div className={profileVisible ? classNames(classes.miniProfile, classes.scrollUp) : classes.miniProfile}>

        <img src={'/img/' + profile.image} className={classes.media}/>
        <Typography className={classNames(classes.nameColor, className)}>
          {profile.name}
        </Typography>

      </div>


    );
  }
}


export default withStyles(style)(Profile);
