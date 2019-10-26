import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import { withStyles, withTheme } from '@material-ui/core/styles';

const style = theme => ({
  root: {
    // width:400,
    // [theme.breakpoints.down('sm')]: {
    //   width:'100%',
    // }
    marginBottom:20,
  },

  img: {
    width: 100,
    height: 100,
    [theme.breakpoints.down('xs')]: {
      width: 85,
      height: 85,
    },
    borderRadius: 10,
    marginRight: 16
  },
  itemTitles: {
    width: 'calc(100% - 120px)',
    minHeight: 100,
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 105px)',
      minHeight: 85,
    },
  },
  cartItemTitle: {
    fontSize: '1.4rem',
    lineHeight: '1.6rem',
    paddingBottom: 2
    // marginBottom:'auto',

  },
  cartVariantTitle: {
    fontSize: '1.0rem'
  },

  quantity: {
    // marginLeft: 100,
    backgroundColor: theme.palette.gray.f5,
    borderRadius: 100,
    maxWidth: 140,
    [theme.breakpoints.down('xs')]: {
      // marginLeft: 85
    },
  }


});

class LineItem extends Component {
  constructor (props) {
    super(props);

    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
  }

  decrementQuantity (lineItemId) {
    const updatedQuantity = this.props.line_item.quantity - 1;
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  incrementQuantity (lineItemId) {
    const updatedQuantity = this.props.line_item.quantity + 1;
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  render () {
    const { classes, line_item, removeLineItemInCart } = this.props;

    return (
      <Grid item container direction="row" className={classes.root}>
        <Grid item>

          <CardMedia
            component="img"
            className={classes.img}
            src={this.props.line_item.variant.image.src}
            alt={`${this.props.line_item.title} product shot`}
          />
        </Grid>

        <Grid item className={classes.itemTitles} spacing={8}>
          <Typography className={classes.cartItemTitle}>
            {this.props.line_item.title}
          </Typography>
          <Typography className={classes.cartVariantTitle}>
            {this.props.line_item.variant.title}
          </Typography>
        </Grid>


        <Grid item container alignItems="center" direction="row" justify="space-between">

          <Grid item className={classes.removeItem}>
            <IconButton onClick={() => removeLineItemInCart(line_item.id)} >
              <RemoveCircleIcon/>
            </IconButton>
          </Grid>

          <Grid item container direction="row" alignItems="center" justify="space-between" className={classes.quantity}>
            <Grid item>
              <IconButton onClick={() => this.decrementQuantity(line_item.id)} >
                -
              </IconButton>
            </Grid>
            <Grid item>
              <Typography className={classes.total}>
                {line_item.quantity}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => this.incrementQuantity(line_item.id)} >
                +
              </IconButton>
            </Grid>
          </Grid>

          <Grid item>
            <Typography >
              {'$' + (line_item.quantity * line_item.variant.price).toFixed(2) }
            </Typography>
          </Grid>

        </Grid>

      </Grid>


    );
  }
}

export default withStyles(style)(LineItem);
