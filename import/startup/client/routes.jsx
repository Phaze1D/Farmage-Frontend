import React from 'react';
import { Router, Route, browserHistory } from 'react-router';


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='dashboard' component={Dashboard}/>

    </Route>
  </Router>

);
