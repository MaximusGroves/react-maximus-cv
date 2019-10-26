import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

class VariantSelector extends Component {
  render() {

    const {
      option,
      handleOptionChange,
      selectedOptions,
      product,
      variantForOptions
    } = this.props;

    const marginStyle={margin:10};

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
            <MenuItem key={option.name +'-'+value.value} value={value.value} >
              {value.value}
            </MenuItem>
          )
        })}
      </TextField>
    );
  }
}

export default VariantSelector;
