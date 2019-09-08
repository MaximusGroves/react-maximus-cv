import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.less';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/defaultTheme.jsx';
import Home from './app/Home.jsx';

class Welcome extends React.PureComponent {
  render () {
    return (
      <MuiThemeProvider theme ={theme()}>
        <Home/>
      </MuiThemeProvider>

    );
  }
}

ReactDOM.render(<Welcome />, document.getElementById('root'));
