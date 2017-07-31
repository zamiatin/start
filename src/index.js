
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// containers
import App from './containers/app';

// components
import Home from './components/home';
import Admin from './components/admin';
import Guest from './components/guest';

const router = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/admin' component={Admin} />
      <Route path='/guest' component={Guest} />
    </Route>
  </Router>
);

ReactDOM.render(
  router,
  document.getElementById('root')
);
