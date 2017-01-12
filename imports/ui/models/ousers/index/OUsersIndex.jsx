import React from 'react';
import {factoryOUser} from '../faker/factoryOUser.js'
import OUserCard from '../card/OUserCard'
import OUsersNew from '../new/OUsersNew'
import OUsersFilter from '../filter/OUsersFilter'
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';



export default class OUsersIndex extends React.Component{
  constructor(props){
    super(props);
    this.onCardUpdate = this.onCardUpdate.bind(this);
  }

  onCardUpdate(customer_id){
    this.refs.dashboard.toggleRight(customer_id, 'Update Permissions');
  }

  render(){
    let ousers = [];

    for(let i = 0; i < 10; i++){
        ousers.push(factoryOUser());
    }

    ousers.sort((a, b) => {
      return a.firstName.localeCompare(b.firstName)
    });

    const listItems = ousers.map((person) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={person._id}>
        <OUserCard {...person} actionLabel='sells' onRequestUpdate={this.onCardUpdate}/>
      </div>
    );

    const right = <OUsersNew/>;
    const filter = <OUsersFilter/>;

    return (
      <Dashboard
        defaultRightTitle='Invite User'
        headerTitle='Users'
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
