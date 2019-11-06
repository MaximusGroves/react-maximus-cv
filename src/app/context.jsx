import React from 'react';

const MaxContext =  React.createContext();
const { Provider, Consumer} = AppContext;

class MaxProvider extends React.Component {
  constructor(props) {
    super(props);







    this.state = {


      actions: {

      }
      
    };
  }



  render() {
    return <MaxProvider value={this.state}>{this.props.children}</MaxProvider>;
  }
}

const withContext = Component => props => (
  <Consumer>{context => <Component {...props} context={context} />}</Consumer>
);

export { withContext };
