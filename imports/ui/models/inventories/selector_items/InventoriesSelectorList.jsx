import React from 'react';
import {RadioButton} from 'material-ui/RadioButton';
import {InventoryCheckBoxItem, InventoryRadioItem} from './InventoryItems';
import SelectorHeader, {handleRadioGroup} from '../../../structure/mselector_list/SelectorHeader';
import MVirtualList from '../../../structure/mvirtual_list/MVirtualList';
import {factoryInventory} from '../faker/factoryInventory.js'



export default class InventoriesSelectorList extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: 10, keyChecked: null};

    this.inventories = []
    for (let i = 0; i < this.state.count; i++) {
      this.inventories.push(factoryInventory())
    }
  }


  render(){

    const items = this.inventories.map((inventory) => {
      return this.props.onlyOne ?
        <InventoryRadioItem
          {...inventory}
          key={inventory._id}
          checked={inventory._id === this.state.keyChecked}
          onRadioClick={handleRadioGroup.bind(this)}/>
      :
        <InventoryCheckBoxItem {...inventory} key={inventory._id}/>
    })

    const sortBy = ['Identifier', 'Created Date', 'Expiration Date', 'Amount'];

    return(
        <div className='mselector-wrapper'>
          <div className='mselector-list'>

            <SelectorHeader
              vID='inventory-list'
              title={this.props.title}
              sortBy={sortBy}
              backTouched={this.props.onRequestChange}/>

            <MVirtualList id='inventory-list'>
              {items}
            </MVirtualList>

          </div>
        </div>
    )
  }
}
