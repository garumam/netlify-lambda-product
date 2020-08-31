import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import ProductDetail from './pages/ProductDetail';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ProductsList} />
        <Route path="/product" exact component={ProductDetail} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;