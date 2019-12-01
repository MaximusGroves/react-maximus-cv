import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import LineItem from './LineItem';

const style = theme => ({
  root: {
    padding: '0 0 16px 0',
    width: 400,
    height: '100%',
    // position:'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  },

  cartTitle: {
    fontSize: '2rem'
  },

  itemSection: {
    width: '100%',
    height: 'calc(100% - 205px)',
    overflowY: 'auto'
  },

  cartItems: {
    paddingRight: 16,
    paddingLeft: 16
  },

  divider: {
    margin: '0 16px 10px 16px'
  },

  dividerBottom: {
    margin: '10px 16px 20px 16px'
  },

  checkoutButton: {
    width: '100%',
    fontSize: '1.2rem',
    padding: 12,
    marginTop: 20
  },
  empty: {
    textAlign: 'center'
  },

  topSection: {
    marginRight: 8,
    marginLeft: 16,
    marginTop: 4,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0
    }
  },
  bottomSection: {
    marginRight: 16,
    marginLeft: 16
  },
  closeCart: {
    marginRight: -5
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
    let lineItems = this.props.checkout.lineItems.map(lineItem => {
      return (
        <LineItem
          updateQuantityInCart={this.props.updateQuantityInCart}
          removeLineItemInCart={this.props.removeLineItemInCart}
          key={lineItem.id.toString()}
          lineItem={lineItem}
        />
      );
    });

    const { classes, cartTotal } = this.props;

    const itemStr = cartTotal > 0 ? cartTotal : 'Empty';

    return (
      <div className={classes.root}>
        <div className={classes.topSection}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography className={classes.cartTitle}>
                {'Your Cart - ' + itemStr}
              </Typography>
            </Grid>
            <Grid item className={classes.closeCart}>
              <IconButton onClick={this.props.handleCartClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>

        <Divider className={classes.divider} />

        <div className={classes.itemSection}>
          <Grid container direction="column" className={classes.cartItems}>
            {lineItems}
          </Grid>
        </div>

        <Divider className={classes.dividerBottom} />
        <div className={classes.bottomSection}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Typography>Subtotal:</Typography>
            </Grid>
            <Grid item>
              <Typography>{'$' + this.props.checkout.subtotalPrice}</Typography>
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

Cart.propTypes = {
  cartTotal: PropTypes.number,
  checkout: PropTypes.object,
  classes: PropTypes.object,
  handleCartClose: PropTypes.func,
  removeLineItemInCart: PropTypes.func,
  updateQuantityInCart: PropTypes.func
};

export default withStyles(style)(Cart);
