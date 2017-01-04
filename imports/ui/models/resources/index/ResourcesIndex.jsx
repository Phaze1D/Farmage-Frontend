import React from 'react';
import {factoryResource} from '../faker/factoryResource.js'
import ResourceCard from '../card/ResourceCard';
import ResourcesNew from '../new/ResourcesNew';
import ResourcesFilter from '../filter/ResourcesFilter';
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';



export default class ResourcesIndex extends React.Component{
  constructor(props){
    super(props);
    this.onCardUpdate = this.onCardUpdate.bind(this);
  }

  onCardUpdate(resource_id){
    this.refs.dashboard.toggleRight(resource_id, 'Update Resource');
  }


  render(){
    let resources = [];

    for(let i = 0; i < 20; i++){
        resources.push(factoryResource());
    }

    resources.sort((a, b) => {
      return a.name.localeCompare(b.name)
    });

    const listItems = resources.map((resource) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-4' key={resource._id}>
        <ResourceCard {...resource} onRequestUpdate={this.onCardUpdate}/>
      </div>
    );

    const right = <ResourcesNew/>;
    const filter = <ResourcesFilter/>;

    return (
      <Dashboard
        defaultRightTitle='New Resource'
        headerTitle='Resources'
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
