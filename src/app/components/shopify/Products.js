import React, { PureComponent } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import Product from './Product';

class Products extends PureComponent {
  render () {
    const { products, addVariantToCart, client } = this.props;
    return (
      <Grid container direction="row" spacing={3}>
        {products.map(
          (product, idx) =>
            product.onlineStoreUrl && (
              <Grid item xs={12} sm={6} md={4} key={'product-' + idx}>
                <Product
                  addVariantToCart={addVariantToCart}
                  client={client}
                  key={product.id.toString()}
                  product={product}
                />
              </Grid>
            )
        )}
      </Grid>
    );
  }
}

Products.propTypes = {
  addVariantToCart: PropTypes.func,
  client: PropTypes.object,
  products: PropTypes.array
};

export default Products;
