import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../../ui/structure/app/App'
import Dashboard from '../../ui/structure/dashboard/Dashboard'

import OrganizationsIndex from '../../ui/models/organizations/index/OrganizationsIndex';
import OrganizationsNew from '../../ui/models/organizations/new/OrganizationsNew';
import OrganizationsFilter from '../../ui/models/organizations/filter/OrganizationsFilter';


import CustomersIndex from '../../ui/models/customers/index/CustomersIndex';
import ProvidersIndex from '../../ui/models/providers/index/ProvidersIndex';
import PersonForm from '../../ui/models/person/PersonForm';
import PersonFilter from '../../ui/models/person/PersonFilter';


import ResourcesIndex from '../../ui/models/resources/index/ResourcesIndex';
import ResourcesNew from '../../ui/models/resources/new/ResourcesNew';
import ResourcesFilter from '../../ui/models/resources/filter/ResourcesFilter';


import ProductsIndex from '../../ui/models/products/index/ProductsIndex';
import ProductsNew from '../../ui/models/products/new/ProductsNew';
import ProductsFilter from '../../ui/models/products/filter/ProductsFilter';


import UnitsIndex from '../../ui/models/units/index/UnitsIndex';
import UnitsNew from '../../ui/models/units/new/UnitsNew';
import UnitsFilter from '../../ui/models/units/filter/UnitsFilter';


import YieldsIndex from '../../ui/models/yields/index/YieldsIndex';
import YieldsNew from '../../ui/models/yields/new/YieldsNew';
import YieldsFilter from '../../ui/models/yields/filter/YieldsFilter';


import ExpensesIndex from '../../ui/models/expenses/index/ExpensesIndex';
import ExpensesNew from '../../ui/models/expenses/new/ExpensesNew';
import ExpensesFilter from '../../ui/models/expenses/filter/ExpensesFilter';


import InventoriesIndex from '../../ui/models/inventories/index/InventoriesIndex';
import InventoriesNew from '../../ui/models/inventories/new/InventoriesNew';
import InventoriesFilter from '../../ui/models/inventories/filter/InventoriesFilter';


import OUsersIndex from '../../ui/models/ousers/index/OUsersIndex';
import OUsersNew from '../../ui/models/ousers/new/OUsersNew';
import OUsersFilter from '../../ui/models/ousers/filter/OUsersFilter';


import SellsIndex from '../../ui/models/sells/index/SellsIndex';
import SellsNew from '../../ui/models/sells/new/SellsNew';
import SellsFilter from '../../ui/models/sells/filter/SellsFilter';

import MovementsIndex from '../../ui/models/movements/index/MovementsIndex';
import MovementsFilter from '../../ui/models/movements/filter/MovementsFilter';






export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='organizations' component={OrganizationsIndex}/>
      <Route path='customers' component={CustomersIndex}/>
      <Route path='providers' component={ProvidersIndex}/>
      <Route path='resources' component={ResourcesIndex}/>
      <Route path='products' component={ProductsIndex}/>
      <Route path='units' component={UnitsIndex}/>
      <Route path='yields' component={YieldsIndex}/>
      <Route path='expenses' component={ExpensesIndex}/>
      <Route path='inventories' component={InventoriesIndex}/>
      <Route path='ousers' component={OUsersIndex}/>
      <Route path='sells' component={SellsIndex}/>
      <Route path='movements' component={MovementsIndex}/>
    </Route>
  </Router>
);
