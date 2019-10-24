import React from 'react';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';


import Products from './shopify/Products';

import { withStyles, withTheme } from '@material-ui/core/styles';


const style = theme => ({
  root: {
    // width:'100%',
    height: 'calc(100% - 100px)',
    display: 'flex',
    justifyContent: 'center',
    padding: 50
  },



  sectionPadding: {
    padding: 5
  },



  headingPadding: {
    padding: 24
  },



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
    const { classes, products, client, addVariantToCart } = this.props;
    const { over } = this.state;

    return (
      <div className={classes.sectionPadding}>


        <Typography variant="h4" className={classes.headingPadding}>
          Side of Epic
        </Typography>

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
