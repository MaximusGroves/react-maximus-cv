import React from 'react'; // eslint-disable-line no-unused-vars

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

export default CartDrawer;
