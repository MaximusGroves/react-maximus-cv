import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './style/main.less';
import { CookiesProvider } from 'react-cookie';

import netlifyIdentity from 'netlify-identity-widget';

import ThemePickerProvider from './app/ThemePickerProvider';
import Home from './app/Home';


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



window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();


ReactDOM.render(

  <BrowserRouter>

      <Route path={['/', '/career', '/comedy', '/commerce']} >
        <CookiesProvider>
          <ThemePickerProvider>
            <Home/>
          </ThemePickerProvider>
        </CookiesProvider>
      </Route>

  </BrowserRouter>

  , document.getElementById('root'));
