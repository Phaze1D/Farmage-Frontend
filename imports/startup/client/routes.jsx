import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from '../../ui/app/app.jsx'
import Dashboard from '../../ui/app/dashboard.jsx'


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='dashboard' component={Dashboard}/>

    </Route>
  </Router>
);
