import React from 'react';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Products from './shopify/Products';

import epicBg from '../assets/images/epicBg.jpg';
import epicLogo from '../assets/images/sideofepic.png';

import { withStyles } from '@material-ui/core/styles';


const style = theme => ({
  root: {
    maxWidth: 1180,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom:42,
    [theme.breakpoints.down('md')]: {
      margin: 42
    },
    [theme.breakpoints.down('sm')]: {
      margin: 16
    }

  },

  firstCard: {
    // marginTop: 0,
    marginLeft: 0,
    marginRight: 0,

    overflow:'hidden',
  },

  paperHeader:{
    backgroundImage: `url(${epicBg})`,
    width:'calc(100% + 100px)',
    display: 'flex',
    justifyContent: 'center',
    margin:'-50px -50px 24px',
    [theme.breakpoints.down('sm')]: {
      width:'calc(100% + 40px)',
      margin:'-20px -20px 24px',
    }
  },

  logo: {
    width: '80%',
    maxWidth: 552,
    margin: 60,
  },

  centerText:{
    textAlign:'center',
  }

});


class Commerce extends React.PureComponent {
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
    const { classes, products, client, addVariantToCart} = this.props;
    const { over } = this.state;

    return (
      <div className={classes.root} >
        <Paper elevation={3} className={classes.firstCard}>
          <div className={classes.paperHeader}>
            <img src ={epicLogo} className={classes.logo}/>
          </div>

          <Typography className={classes.centerText}>
            Side of Epic is my merchandise store to "provide clothing and gear for contrarian virtue signaling."
          </Typography>

          <Typography className={classes.centerText}>
            "That's our grift to you."
          </Typography>
        </Paper>

        <Products
          products={products}
          client={client}
          addVariantToCart={addVariantToCart}
        />

      </div>
    );
  }
}


export default withStyles(style)(Commerce);
