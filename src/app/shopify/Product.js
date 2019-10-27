import React, { Component } from 'react';
import { Link,} from "react-router-dom";
import VariantSelector from './VariantSelector';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import CardMedia from '@material-ui/core/CardMedia';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles, withTheme } from '@material-ui/core/styles';

const style = theme => ({
  variantImage: {
    width: '100%',
    height: '100%',
    userSelect: 'none',
  },
  paperOverride: {
    margin: 'unset',
    padding: 'unset',
    overflow: 'hidden'
  },
  productContent: {
    padding: 24,
    borderRadius: 10,
    textAlign: 'center'
  },

  price: {
    color: 'white',
    marginTop: -64,
    marginRight: 15,
    textAlign: 'right',
    fontSize: '2.5rem',
    fontWeight: 900,
    textShadow:
    '1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191, 1px 4px 1px rgba(0,0,0,0.5), 1px 5px 1px rgba(0,0,0,0.3), 0 0 10px rgba(0,0,0,1),0 0 20px rgba(0,0,0,1),0 0 30px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,1)'
  },

  cartBtn: {
    display: 'flex',
    marginLeft: 'auto'
  },

  productName: {
    padding:0,
  },

  quantity: {
    backgroundColor: theme.palette.gray.f5,
    padding: 5,
    borderRadius: 100,
    width: '75%',
    minWidth: 200,
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  total: {
    fontSize: '2rem',
    userSelect: 'none',
},

  spaceMenuItem: {
    marginRight: 100
  },

  variantGroup:{
    margin:'20px 0',
  },


});

class Product extends Component {
  constructor (props) {
    super(props);

    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      if(selector.name ==="Size"){
        defaultOptionValues['Size'] = 'L'
      } else {
        defaultOptionValues[selector.name] = selector.values[0].value;
      }

    });

    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, defaultOptionValues);

    this.state = {
      selectedOptions: defaultOptionValues,
      selectedVariant: selectedVariant,
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  // componentDidMount(){
  //   const { product} = this.props;
  //
  //   let largeVariant = product.variants.find(variant=>{
  //       // console.log(variant);
  //
  //       const isLarge = variant.selectedOptions.find(option=>{
  //         // console.log(option);
  //         return(option.name==='Size' && option.value==='L')
  //       })
  //       return(isLarge);
  //     });
  //
  //   this.setState({selectedVariant:largeVariant, selectedOptions:largeVariant.selectedOptions});
  //
  // }

  findImage (images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange (event) {
    const target = event.target;

    console.log(target.name);
    console.log(target.value);
    let selectedOptions = this.state.selectedOptions;

    selectedOptions[target.name] = target.value;

    console.log(selectedOptions);

    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions);

    console.log(selectedVariant);

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  handleQuantityChange (event, val) {
    this.setState({
      selectedVariantQuantity: val
    });
  }

  mouseEnter = (evt) => {
    console.log('mouse enter');
    this.setState({ over: true });
  }

  mouseLeave = (evt) => {
    console.log('mouse leave');
    this.setState({ over: false });
  }

  mouseHover = (evt) => {
    console.log('mouse hover');
  }

  render () {
    const { product, addVariantToCart, classes } = this.props;
    const { selectedVariantImage, selectedVariant, selectedVariantQuantity, over, selectedOptions } = this.state;

    let variantImage = selectedVariantImage || product.images[0];
    let variant = selectedVariant || product.variants[0];
    let variantQuantity = selectedVariantQuantity || 1;

    // console.log('product.options', product.options);
    // console.log('selectedOptions', selectedOptions);

    let variantSelectors = product.options.map((option) => {
      return (
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
          product={product}
          selectedOptions={selectedOptions}
          variantForOptions={this.props.client.product.helpers.variantForOptions}
        />
      );
    });


    return (
      <Paper elevation={over ? 8 : 3} className={classes.paperOverride} >

        <CardMedia
          className={classes.variantImage}
          src={variantImage.src}
          title="Product Shot"
          component="img"
          alt={`${product.title} product shot`}
        />

        <Typography className={classes.price} >
          {'$' + variant.price}
        </Typography>

        <div className={classes.productContent}>
          <Typography variant="h4" className={classes.productName}>
            {product.title}
          </Typography>

          <div className={classes.variantGroup}>
          {variantSelectors}
          </div>

          <Grid container direction="row" alignItems="center" justify="space-around" className={classes.quantity}>
            <Grid item>
              <IconButton onClick={e => this.handleQuantityChange(e, variantQuantity - 1)} disabled={variantQuantity < 2}>
                <ExposureNeg1Icon/>
              </IconButton>
            </Grid>
            <Grid item>
              <Typography className={classes.total}>
                {variantQuantity}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={e => this.handleQuantityChange(e, variantQuantity + 1)} >
                <ExposurePlus1Icon/>
              </IconButton>
            </Grid>
          </Grid>

          <Grid container direction="row" justify="space-between">

            <Grid item>

                <a href={product.onlineStoreUrl} target="_blank">
                  <Tooltip title="Go To Store Page">
                    <IconButton >
                      <ExitToAppIcon/>
                    </IconButton>
                  </Tooltip>
                </a>


            </Grid>
            <Grid item>
              <Tooltip title="Add To Cart">
                <IconButton className={classes.cartBtn} onClick={() => addVariantToCart(variant.id, variantQuantity)}>
                  <AddShoppingCartIcon/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

        </div>
      </Paper>
    );
  }
}

export default withStyles(style)(Product);
