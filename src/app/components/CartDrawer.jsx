import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';

import Cart from 'components/shopify/Cart';

const CartDrawer = props => {
  const { DrawerProps, CartProps } = props;

  return (
    <Drawer {...DrawerProps}>
      <Cart {...CartProps} />
    </Drawer>
  );
};

CartDrawer.propTypes = {
  CartProps: PropTypes.object,
  DrawerProps: PropTypes.object
};

export default CartDrawer;
