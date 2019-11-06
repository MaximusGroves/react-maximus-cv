import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './style/main.less';

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





ReactDOM.render(
  <BrowserRouter>
    <Route
      path={['/', '/career', '/comedy', '/commerce']}
      children={
        <ThemePickerProvider>
          <Home/>
        </ThemePickerProvider>
      } />
  </BrowserRouter>,

  document.getElementById('root')
);
