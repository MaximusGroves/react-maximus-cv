import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import netlifyIdentity from 'netlify-identity-widget';
import { CookiesProvider } from 'react-cookie';

import ThemePickerProvider from 'app/ThemePickerProvider';
import Home from 'app/Home';

import './style/main.less';

window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <BrowserRouter>
      <Route
        path={['/', '/cover', '/career', '/comedy', '/commerce', '/video']}
      >
        <CookiesProvider>
          <ThemePickerProvider>
            <Home />
          </ThemePickerProvider>
        </CookiesProvider>
      </Route>
    </BrowserRouter>,
    rootElement
  );
} else {
  ReactDOM.render(
    <BrowserRouter>
      <Route
        path={['/', '/cover', '/career', '/comedy', '/commerce', '/video']}
      >
        <CookiesProvider>
          <ThemePickerProvider>
            <Home />
          </ThemePickerProvider>
        </CookiesProvider>
      </Route>
    </BrowserRouter>,
    rootElement
  );
}
