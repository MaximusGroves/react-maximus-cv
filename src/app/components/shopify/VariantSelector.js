import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

class VariantSelector extends Component {
  render () {
    const {
      option,
      handleOptionChange,
      selectedOptions
      // product,
      // variantForOptions
    } = this.props;

    const marginStyle = { margin: 10 };

    return (
      <TextField
        select
        label={option.name}
        name={option.name}
        value={selectedOptions && selectedOptions[option.name]}
        onChange={handleOptionChange}
        variant="outlined"
        style={marginStyle}
      >
        {option.values.map(value => {
          return (
            <MenuItem key={option.name + '-' + value.value} value={value.value}>
              {value.value}
            </MenuItem>
          );
        })}
      </TextField>
    );
  }
}

VariantSelector.propTypes = {
  handleOptionChange: PropTypes.func,
  option: PropTypes.object,
  selectedOptions: PropTypes.object
};

export default VariantSelector;
