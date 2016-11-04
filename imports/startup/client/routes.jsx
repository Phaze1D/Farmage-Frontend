import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../../ui/structure/app/App'
import Dashboard from '../../ui/structure/dashboard/Dashboard'
import OrganizationsIndex from '../../ui/models/organizations/index/OrganizationsIndex';
import OrganizationsNew from '../../ui/models/organizations/new/OrganizationsNew';

import CustomersIndex from '../../ui/models/customers/index/CustomersIndex';
import CustomersNew from '../../ui/models/customers/new/CustomersNew';




export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='dashboard' component={Dashboard}>
        <Route path='organizations' components={{main: OrganizationsIndex, right: OrganizationsNew}}/>
        <Route path='customers' components={{main: CustomersIndex, right: CustomersNew}}/>

      </Route>
    </Route>
  </Router>
);
