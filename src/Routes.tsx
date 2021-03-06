import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AppLayout from './AppLayout';
import ProductsList from './pages/ProductsList';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import Error404 from './pages/Error404';

import { theme } from './global/theme';
import GlobalStyle from './global/styles';

function Routes() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <AppLayout>
          <Switch>
            <Route path="/" exact component={ProductsList} />
            <Route path="/product/:id" exact component={ProductInfo} />
            <Route path="/cart" exact component={Cart} />
            <Route path="*" component={Error404} />
          </Switch>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Routes;
