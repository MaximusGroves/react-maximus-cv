import React, { Component } from 'react';
import LineItem from './LineItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


import Divider from '@material-ui/core/Divider';

import CloseIcon from '@material-ui/icons/Close';

import { withStyles, withTheme } from '@material-ui/core/styles';


const style = theme => ({
  root: {
    padding: '0 0 16px 0',
    width: 400,
    height:'100%',
    // position:'relative',
    overflow:'hidden',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  },

  itemSection:{
    width:'100%',
    height:'calc(100% - 205px)',
    overflowY:'auto',
  },

  cartItems:{
    paddingRight:16,
    paddingLeft:16,
  },

  divider:{
    margin:'0 16px 10px 16px',
  },

  dividerBottom:{
    margin:'10px 16px 20px 16px',
  },

  checkoutButton:{
    width:'100%',
    color:'white',
    fontSize:'1.2rem',
    padding: 12,
    marginTop:20,
  },
  empty:{
    textAlign:'center',
  },

  topSection:{
    marginRight:8,
    marginLeft:16,
    marginTop:4,
    [theme.breakpoints.down('xs')]: {
      marginRight:0,
    }
  },
  bottomSection:{
    marginRight:16,
    marginLeft:16,
  },
  closeCart:{
    marginRight:-5,
  }

});


class Cart extends Component {
  constructor (props) {
    super(props);

    this.openCheckout = this.openCheckout.bind(this);
  }

  openCheckout () {
    window.open(this.props.checkout.webUrl);
  }

  render () {
    let line_items = this.props.checkout.lineItems.map((line_item, idx) => {
      return (
        <LineItem
          updateQuantityInCart={this.props.updateQuantityInCart}
          removeLineItemInCart={this.props.removeLineItemInCart}
          key={line_item.id.toString()}
          line_item={line_item}
        />
      );
    });

    const {
      classes, cartTotal
    } = this.props;

    const itemStr = cartTotal > 0 ? cartTotal : 'Empty';

    return (
      <div className={classes.root} >
        <div className={classes.topSection}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h2">
                {'Your Cart - ' + itemStr}
              </Typography>
            </Grid>
            <Grid item className={classes.closeCart}>
              <IconButton onClick={this.props.handleCartClose}>
                <CloseIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </div>

        <Divider className={classes.divider}/>


        <div className={classes.itemSection}>
          <Grid container direction="column" className={classes.cartItems}>
            {line_items}
          </Grid>
        </div>



        <Divider className={classes.dividerBottom}/>
        <div className={classes.bottomSection}>
          <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid item>
              <Typography>
                Subtotal:
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {"$" + this.props.checkout.subtotalPrice}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.openCheckout}
                className={classes.checkoutButton}
                disabled={this.props.checkout.lineItems.length === 0}
              >
                Check Out
              </Button>
            </Grid>

          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Cart);
