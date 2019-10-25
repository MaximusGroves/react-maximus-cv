import React, { PureComponent } from 'react';
import Product from './Product';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class Products extends PureComponent {
  render () {
    const { products, addVariantToCart, client } = this.props;
    return (

        <Grid container direction="row" spacing={3} >
          {products.map(product =>
            (product.onlineStoreUrl && <Grid item xs={12} sm={6} md={4}>
              <Product
                addVariantToCart={addVariantToCart}
                client={client}
                key={product.id.toString()}
                product={product}
              />
            </Grid>)
          )}
        </Grid>

    );
  }
}

export default Products;
