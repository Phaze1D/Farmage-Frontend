import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../../ui/structure/app/App'
import Dashboard from '../../ui/structure/dashboard/Dashboard'
import OrganizationsIndex from '../../ui/models/organizations/index/OrganizationsIndex';
import CustomersIndex from '../../ui/models/customers/index/CustomersIndex';



export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='dashboard' component={Dashboard}>
        <Route path='organizations' component={OrganizationsIndex}/>
        <Route path='customers' component={CustomersIndex}/>

      </Route>
    </Route>
  </Router>
);
