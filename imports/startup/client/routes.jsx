import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../../ui/structure/app/App'
import OrganizationsIndex from '../../ui/models/organizations/index/OrganizationsIndex';
import CustomersIndex from '../../ui/models/customers/index/CustomersIndex';
import ProvidersIndex from '../../ui/models/providers/index/ProvidersIndex';
import ResourcesIndex from '../../ui/models/resources/index/ResourcesIndex';
import ProductsIndex from '../../ui/models/products/index/ProductsIndex';
import UnitsIndex from '../../ui/models/units/index/UnitsIndex'
import YieldsIndex from '../../ui/models/yields/index/YieldsIndex';
import ExpensesIndex from '../../ui/models/expenses/index/ExpensesIndex';
import BatchesIndex from '../../ui/models/batches/index/BatchesIndex';
import OUsersIndex from '../../ui/models/ousers/index/OUsersIndex';
import SellsIndex from '../../ui/models/sells/index/SellsIndex';
import MovementsIndex from '../../ui/models/movements/index/MovementsIndex';








export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={CustomersIndex}/>
      <Route path='organizations' component={OrganizationsIndex}/>
      <Route path='customers' component={CustomersIndex}/>
      <Route path='providers' component={ProvidersIndex}/>
      <Route path='resources' component={ResourcesIndex}/>
      <Route path='products' component={ProductsIndex}/>
      <Route path='units' component={UnitsIndex}/>
      <Route path='yields' component={YieldsIndex}/>
      <Route path='expenses' component={ExpensesIndex}/>
      <Route path='batches' component={BatchesIndex}/>
      <Route path='ousers' component={OUsersIndex}/>
      <Route path='sells' component={SellsIndex}/>
      <Route path='movements' component={MovementsIndex}/>
    </Route>
  </Router>
);
