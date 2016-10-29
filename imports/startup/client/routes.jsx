import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from '../../ui/structure/app/App.jsx'
import Dashboard from '../../ui/structure/dashboard/Dashboard.jsx'


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='dashboard' component={Dashboard}/>

    </Route>
  </Router>
);
