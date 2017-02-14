import React from 'react';
import Dashboard from '../../../structure/dashboard/Dashboard';
import OrganizationsNew from '../new/OrganizationsNew';
import OrganizationCard from '../card/OrganizationCard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';

import {factoryOrganization} from '../faker/factoryOrganization';


export default class OrganizationsIndex extends React.Component{
  constructor(props){
    super(props);


    this.onCardUpdate = this.onCardUpdate.bind(this)

    this.organizations = [];
    for(let i = 0; i < 5; i++){
        this.organizations.push(factoryOrganization());
    }

    this.organizations.sort((a, b) => {
      return a.name.localeCompare(b.name)
    });
  }


  onCardUpdate(organ_id){
    this.refs.dashboard.toggleRight(organ_id, 'Update Organization');
  }

  render(){
    const listItems = this.organizations.map((organ) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-4' key={organ._id}>
        <OrganizationCard {...organ} onRequestUpdate={this.onCardUpdate}/>
      </div>
    );

    const right = <OrganizationsNew/>;


    return (
      <Dashboard
        defaultRightTitle='New Organization'
        headerTitle='Organizations'
        showMFAB={true}
        right={right}
        filter={null}
        ref='dashboard'
        key='main-dash'>

        <MVirtualGrid>
          {listItems}
        </MVirtualGrid>

      </Dashboard>
    )
  }
}
