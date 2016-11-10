import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../../ui/structure/app/App'
import Dashboard from '../../ui/structure/dashboard/Dashboard'

import OrganizationsIndex from '../../ui/models/organizations/index/OrganizationsIndex';
import OrganizationsNew from '../../ui/models/organizations/new/OrganizationsNew';
import CustomersIndex from '../../ui/models/customers/index/CustomersIndex';
import ProvidersIndex from '../../ui/models/providers/index/ProvidersIndex';
import PersonForm from '../../ui/models/person/PersonForm';
import ResourcesIndex from '../../ui/models/resources/index/ResourcesIndex';
import ResourcesNew from '../../ui/models/resources/new/ResourcesNew';
import ProductsIndex from '../../ui/models/products/index/ProductsIndex';
import ProductsNew from '../../ui/models/products/new/ProductsNew';
import UnitsIndex from '../../ui/models/units/index/UnitsIndex';
import UnitsNew from '../../ui/models/units/new/UnitsNew';
import YieldsIndex from '../../ui/models/yields/index/YieldsIndex';
import YieldsNew from '../../ui/models/yields/new/YieldsNew';
import ExpensesIndex from '../../ui/models/expenses/index/ExpensesIndex';
import ExpensesNew from '../../ui/models/expenses/new/ExpensesNew';
import InventoriesIndex from '../../ui/models/inventories/index/InventoriesIndex';
import InventoriesNew from '../../ui/models/inventories/new/InventoriesNew';
import OUsersIndex from '../../ui/models/ousers/index/OUsersIndex';
import OUsersNew from '../../ui/models/ousers/new/OUsersNew';
import SellsIndex from '../../ui/models/sells/index/SellsIndex';
import SellsNew from '../../ui/models/sells/new/SellsNew';





export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='dashboard' component={Dashboard}>
        <Route path='organizations' components={{main: OrganizationsIndex, right: OrganizationsNew}}/>
        <Route path='customers' components={{main: CustomersIndex, right: PersonForm}}/>
        <Route path='providers' components={{main: ProvidersIndex, right: PersonForm}}/>
        <Route path='resources' components={{main: ResourcesIndex, right: ResourcesNew}}/>
        <Route path='products' components={{main: ProductsIndex, right: ProductsNew}}/>
        <Route path='units' components={{main: UnitsIndex, right: UnitsNew}}/>
        <Route path='yields' components={{main: YieldsIndex, right: YieldsNew}}/>
        <Route path='expenses' components={{main: ExpensesIndex, right: ExpensesNew}}/>
        <Route path='inventories' components={{main: InventoriesIndex, right: InventoriesNew}}/>
        <Route path='ousers' components={{main: OUsersIndex, right: OUsersNew}}/>
        <Route path='sells' components={{main: SellsIndex, right: SellsNew}}/>

      </Route>
    </Route>
  </Router>
);
