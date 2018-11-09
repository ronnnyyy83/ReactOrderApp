import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import NotFound from '../components/NotFound/NotFound';
import asyncComponent from '../hoc/AsyncComponent/AsyncComponent';

const AsyncOrders = asyncComponent(() => {
  return import('./Order/Orders');
});

const AsyncOrderDetails = asyncComponent(() => {
  return import('./Order/OrderDetails');
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/orders" component={AsyncOrders} />
            <Route path="/order/:id" component={AsyncOrderDetails} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
