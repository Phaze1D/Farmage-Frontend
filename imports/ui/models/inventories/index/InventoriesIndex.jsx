import React from 'react';
import {factoryInventory} from '../faker/factoryInventory.js';
import InventoryCard from '../card/InventoryCard';
import InventoriesNew from '../new/InventoriesNew';
import InventoriesFilter from '../filter/InventoriesFilter';
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';


export default class InventoriesIndex extends React.Component{
  constructor(props){
    super(props);
    this.onCardUpdate = this.onCardUpdate.bind(this);
  }

  onCardUpdate(inventory_id){
    this.refs.dashboard.toggleRight(inventory_id, 'Update Inventory');
  }


  render(){
    let inventories = [];

    for(let i = 0; i < 20; i++){
        inventories.push(factoryInventory());
    }

    inventories.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

    const listItems = inventories.map((inventory) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={inventory._id}>
        <InventoryCard {...inventory} onRequestUpdate={this.onCardUpdate}/>
      </div>
    );

    const right = <InventoriesNew/>;
    const filter = <InventoriesFilter/>;

    return (
      <Dashboard
        defaultRightTitle='New Inventory'
        headerTitle='Inventories'
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
