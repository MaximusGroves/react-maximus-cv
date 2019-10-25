import React, { Component } from 'react';
import VariantSelector from './VariantSelector';
import Paper from '@material-ui/core/Paper';

import { withStyles, withTheme } from '@material-ui/core/styles';

const style = theme => ({
  variantImage: {
    width: '100%'
  },
  paperOverride: {
    margin: 'unset',
    padding: 'unset',
    overflow: 'hidden'
  },
  productContent: {
    padding: 24,
    borderRadius: 10
  }

});

class Product extends Component {
  constructor (props) {
    super(props);

    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });

    this.state = {
      selectedOptions: defaultOptionValues,
      over: false
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  findImage (images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange (event) {
    const target = event.target;
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions);

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  handleQuantityChange (event) {
    this.setState({
      selectedVariantQuantity: event.target.value
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
    const { selectedVariantImage, selectedVariant, selectedVariantQuantity, over } = this.state;

    let variantImage = selectedVariantImage || product.images[0];
    let variant = selectedVariant || product.variants[0];
    let variantQuantity = selectedVariantQuantity || 1;
    let variantSelectors = product.options.map((option) => {
      return (
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      );
    });
    return (
      <Paper elevation={over ? 8 : 3} className={classes.paperOverride} onHover={this.mouseHover}>
        {product.images.length ? <img className={classes.variantImage} src={variantImage.src} alt={`${product.title} product shot`}/> : null}

        <div className={classes.productContent}>
          <h5 >{product.title}</h5>
          <span >${variant.price}</span>
          {variantSelectors}
          <label >
            Quantity
            <input min="1" type="number" defaultValue={variantQuantity} onChange={this.handleQuantityChange} />
          </label>
          <button onClick={() => addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
        </div>
      </Paper>
    );
  }
}

export default withStyles(style)(Product);
