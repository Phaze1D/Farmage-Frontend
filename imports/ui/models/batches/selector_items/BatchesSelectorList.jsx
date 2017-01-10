import React from 'react';
import {RadioButton} from 'material-ui/RadioButton';
import {BatchCheckBoxItem, BatchRadioItem} from './BatchItems';
import SelectorHeader, {handleRadioGroup} from '../../../structure/mselector_list/SelectorHeader';
import MVirtualList from '../../../structure/mvirtual_list/MVirtualList';
import {factoryBatch} from '../faker/factoryBatch.js'



export default class BatchesSelectorList extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: 10, keyChecked: null};

    this.batches = []
    for (let i = 0; i < this.state.count; i++) {
      this.batches.push(factoryBatch())
    }
  }


  render(){

    const items = this.batches.map((batch) => {
      return this.props.onlyOne ?
        <BatchRadioItem
          {...batch}
          key={batch._id}
          checked={batch._id === this.state.keyChecked}
          onRadioClick={handleRadioGroup.bind(this)}/>
      :
        <BatchCheckBoxItem {...batch} key={batch._id}/>
    })

    const sortBy = ['Identifier', 'Created Date', 'Expiration Date', 'Amount'];

    return(
        <div className='mselector-wrapper'>
          <div className='mselector-list'>

            <SelectorHeader
              vID='batch-list'
              title={this.props.title}
              sortBy={sortBy}
              backTouched={this.props.onRequestChange}/>

            <MVirtualList id='batch-list'>
              {items}
            </MVirtualList>

          </div>
        </div>
    )
  }
}
