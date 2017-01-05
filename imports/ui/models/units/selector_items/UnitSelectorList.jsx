import React from 'react';
import {RadioButton} from 'material-ui/RadioButton';
import {UnitCheckboxItem, UnitRadioItem} from './UnitItems';
import SelectorHeader, {handleRadioGroup} from '../../../structure/mselector_list/SelectorHeader';
import MVirtualList from '../../../structure/mvirtual_list/MVirtualList';
import {factoryUnit} from '../faker/factoryUnit.js'



export default class UnitSelectorList extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: 10, keyChecked: null};

    this.resources = []
    for (let i = 0; i < this.state.count; i++) {
      const r = factoryUnit();
      this.resources.push(r)
    }
  }

  render(){

    const items = this.resources.map((resource) => {
      return this.props.onlyOne ?
        <UnitRadioItem
          {...resource}
          key={resource._id}
          checked={resource._id === this.state.keyChecked}
          onRadioClick={handleRadioGroup.bind(this)}/>
      :
        <UnitCheckboxItem {...resource} key={resource._id}/>
    })

    const sortBy = ['Identifier', 'Active', 'Active Sub Units']
    return(
        <div className='mselector-wrapper'>
          <div className='mselector-list'>

            <SelectorHeader
              vID='unit-list'
              title='Units'
              sortBy={sortBy}
              backTouched={this.props.onRequestChange}/>

            <MVirtualList id='unit-list'>
              {items}
            </MVirtualList>

          </div>
        </div>
    )
  }
}
