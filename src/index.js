import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.less';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import theme from './theme/defaultTheme.jsx'
import Home from './app/Home.jsx';
import Client from 'shopify-buy';

// import Loadable from 'react-loadable';
//
//
// const LoaderGraphic = (props) =>{
//   if (props.error) {
//     return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
//   } else {
//     return <div style={{width:'100%', textAlign:'center', marginTop:'20px',}}><CircularProgress  /></div>;
//   }
// }


// const LoadableHome = Loadable({
//   loader: () => import('./app/Home.jsx'),
//   loading: LoaderGraphic
// });


const client = Client.buildClient({
  storefrontAccessToken: '81d96a7fed4ba666821d0df89000b92a',
  domain: 'sideofepic.com'
});



ReactDOM.render(
  <MuiThemeProvider theme={theme()}>
    <Home client={client} />
  </MuiThemeProvider>,

  document.getElementById('root')
);
