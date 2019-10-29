import React from 'react';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Products from '../Components/shopify/Products';

import epicBg from '../../assets/images/epicBg.jpg';
import epicLogo from '../../assets/images/sideofepic.png';
import classnames from 'classnames'

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



const Commerce = props => {
  const {classes, products, client, addVariantToCart, content, className} = props;

  return (
    <div className={classnames(classes.root, className)}>
      <Paper elevation={3} className={classes.firstCard}>
        <div className={classes.paperHeader}>
          <img src={epicLogo} className={classes.logo}/>
        </div>

        <Typography className={classes.centerText} variant="body2">
          {content ? content.pitch.description : ''}
        </Typography>
        <Typography className={classes.centerText} variant="body2">
          {content ? content.pitch.slogan : ''}
        </Typography>

        <Typography className={classes.centerText} variant="body2">
          {content ? content.pitch.detailed : ''}
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

export default withStyles(style)(Commerce);
