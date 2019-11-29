import React from 'react';

import Drawer from '@material-ui/core/Drawer';

import Cart from 'Components/shopify/Cart';

const CartDrawer = props => {
  const {
    DrawerProps,
    CartProps
  } = props;

  return (
    <Drawer
      {...DrawerProps}
    >
      <Cart
        {...CartProps}
      />

    </Drawer>
  );
};

export default CartDrawer;
