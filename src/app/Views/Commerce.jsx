import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

import Products from 'components/shopify/Products';

import epicBg from 'assets/images/epicBg.jpg';
import epicLogo from 'assets/images/sideofepic.png';

const style = theme => ({
  root: {
    maxWidth: 1180,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 42,
    [theme.breakpoints.down('md')]: {
      margin: 42
    },
    [theme.breakpoints.down('sm')]: {
      margin: 16
    }
  },

  firstCard: {
    // marginTop: 0,
    marginLeft: 0,
    marginRight: 0,

    overflow: 'hidden'
  },

  paperHeader: {
    backgroundImage: `url(${epicBg})`,
    width: 'calc(100% + 100px)',
    display: 'flex',
    justifyContent: 'center',
    margin: '-50px -50px 24px',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% + 40px)',
      margin: '-20px -20px 24px'
    }
  },

  logo: {
    width: '80%',
    maxWidth: 552,
    margin: 60
  },

  centerText: {
    textAlign: 'center'
  }
});

const blankContent = {
  pitch: {
    description: '',
    slogan: '',
    detailed: ''
  }
};

const Commerce = props => {
  const {
    classes,
    products,
    client,
    addVariantToCart,
    content,
    className,
    viewRef
  } = props;

  const useContent = content || blankContent;

  return (
    <div className={classNames(classes.root, className)} ref={viewRef}>
      <Paper elevation={3} className={classes.firstCard}>
        <div className={classes.paperHeader}>
          <img src={epicLogo} className={classes.logo} />
        </div>

        <Typography className={classes.centerText} variant="body2">
          {useContent.pitch.description}
        </Typography>
        <Typography className={classes.centerText} variant="body2">
          {useContent.pitch.slogan}
        </Typography>

        <Typography className={classes.centerText} variant="body2">
          {useContent.pitch.detailed}
        </Typography>
      </Paper>

      <Products
        products={products}
        client={client}
        addVariantToCart={addVariantToCart}
      />
    </div>
  );
};

export default withStyles(style)(Commerce);
