import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { withStyles, withTheme } from '@material-ui/core/styles';

const style = theme => ({
  // root: {
  //   width:400,
  //   [theme.breakpoints.down('sm')]: {
  //     width:'100%',
  //   }
  // }

  img: {
    width: 100,
    height: 100

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
    const { classes } = this.props;

    return (
      <Grid item container direction="row">
        <Grid item>

          <CardMedia
            component="img"
            className={classes.img}
            src={this.props.line_item.variant.image.src}
            alt={`${this.props.line_item.title} product shot`}
          />
        </Grid>

        <Grid item>
          <Typography>
            {this.props.line_item.title}
          </Typography>
          <Typography>
            {this.props.line_item.variant.title}
          </Typography>
        </Grid>

        <Grid item>

          <div className="Line-item__content">
            <div className="Line-item__content-row">
              <div className="Line-item__quantity-container">
                <button className="Line-item__quantity-update" onClick={() => this.decrementQuantity(this.props.line_item.id)}>-</button>
                <span className="Line-item__quantity">{this.props.line_item.quantity}</span>
                <button className="Line-item__quantity-update" onClick={() => this.incrementQuantity(this.props.line_item.id)}>+</button>
              </div>
              <span className="Line-item__price">
                $ { (this.props.line_item.quantity * this.props.line_item.variant.price).toFixed(2) }
              </span>
              <button className="Line-item__remove" onClick={() => this.props.removeLineItemInCart(this.props.line_item.id)}>×</button>
            </div>
          </div>

        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(LineItem);
