import React from 'react';
import {RadioButton} from 'material-ui/RadioButton';
import {YieldCheckBoxItem, YieldRadioItem} from './YieldItems';
import SelectorHeader, {handleRadioGroup} from '../../../structure/mselector_list/SelectorHeader';
import MVirtualList from '../../../structure/mvirtual_list/MVirtualList';
import {factoryYield} from '../faker/factoryYield.js'



export default class YieldsSelectorList extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: 10, keyChecked: null};

    this.yields = []
    for (let i = 0; i < this.state.count; i++) {
      this.yields.push(factoryYield())
    }
  }


  render(){

    const items = this.yields.map((_yield) => {
      return this.props.onlyOne ?
        <YieldRadioItem
          {..._yield}
          key={_yield._id}
          checked={_yield._id === this.state.keyChecked}
          onRadioClick={handleRadioGroup.bind(this)}/>
      :
        <YieldCheckBoxItem {..._yield} key={_yield._id}/>
    })

    const sortBy = ['Identifier', 'Created Date', 'Expiration Date', 'Amount'];

    return(
        <div className='mselector-wrapper'>
          <div className='mselector-list'>

            <SelectorHeader
              vID='_yield-list'
              title={this.props.title}
              sortBy={sortBy}
              backTouched={this.props.onRequestChange}/>

            <MVirtualList id='_yield-list'>
              {items}
            </MVirtualList>

          </div>
        </div>
    )
  }
}
