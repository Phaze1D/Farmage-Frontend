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
      <IndexRoute component={Dashboard}/>
      <Route path='dashboard' component={Dashboard}>
        <Route path='organizations' components={{main: OrganizationsIndex, right: OrganizationsNew, filter: OrganizationsFilter}}/>
        <Route path='customers' components={{main: CustomersIndex, right: PersonForm, filter: PersonFilter}}/>
        <Route path='providers' components={{main: ProvidersIndex, right: PersonForm, filter: PersonFilter}}/>
        <Route path='resources' components={{main: ResourcesIndex, right: ResourcesNew, filter: ResourcesFilter}}/>
        <Route path='products' components={{main: ProductsIndex, right: ProductsNew, filter: ProductsFilter}}/>
        <Route path='units' components={{main: UnitsIndex, right: UnitsNew, filter: UnitsFilter}}/>
        <Route path='yields' components={{main: YieldsIndex, right: YieldsNew, YieldsFilter}}/>
        <Route path='expenses' components={{main: ExpensesIndex, right: ExpensesNew, filter: ExpensesFilter}}/>
        <Route path='inventories' components={{main: InventoriesIndex, right: InventoriesNew, filter: InventoriesFilter}}/>
        <Route path='ousers' components={{main: OUsersIndex, right: OUsersNew, filter: OUsersFilter}}/>
        <Route path='sells' components={{main: SellsIndex, right: SellsNew, filter: SellsFilter}}/>
        <Route path='movements' components={{main: MovementsIndex, filter: MovementsFilter}}/>

      </Route>
    </Route>
  </Router>
);
