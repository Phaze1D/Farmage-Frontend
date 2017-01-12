import React from 'react';
import PersonCard from '../../person/PersonCard';
import PersonForm from '../../person/PersonForm';
import PersonFilter from '../../person/PersonFilter';
import {factoryPerson} from '../../person/faker/factoryPerson.js';
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';





export default class CustomersIndex extends React.Component{
  constructor(props){
    super(props);
    this.onCardUpdate = this.onCardUpdate.bind(this);

  }

  onCardUpdate(customer_id){
    this.refs.dashboard.toggleRight(customer_id, 'Update Customer');
  }

  render(){
    let customers = [];

    for(let i = 0; i < 20; i++){
        customers.push(factoryPerson());
    }

    customers.sort((a, b) => {
      return a.firstName.localeCompare(b.firstName)
    });

    const listItems = customers.map((person) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={person._id}>
        <PersonCard {...person} actionLabel='sells' onRequestUpdate={this.onCardUpdate}/>
      </div>
    );

    const right = <PersonForm />;
    const filter = <PersonFilter/>;

    return (
      <Dashboard
        defaultRightTitle='New Customer'
        headerTitle='Customers'
        showMFAB={true}
        right={right}
        filter={filter}
        ref='dashboard'
        key='main-dash'>

        <MVirtualGrid>
          {listItems}
        </MVirtualGrid>

      </Dashboard>

    );
  }
}
