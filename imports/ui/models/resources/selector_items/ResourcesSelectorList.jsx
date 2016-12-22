import React from 'react';
import {RadioButton} from 'material-ui/RadioButton';
import {ResourceCheckBoxItem, ResourceRadioItem} from './ResourceItems';
import SelectorHeader, {handleRadioGroup} from '../../../structure/mselector_list/SelectorHeader';
import MVirtualList from '../../../structure/mvirtual_list/MVirtualList';
import {factoryResource} from '../faker/factoryResource.js'



export default class ResourcesSelectorList extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: 10, keyChecked: null};

    this.resources = []
    for (let i = 0; i < this.state.count; i++) {
      this.resources.push(factoryResource())
    }
  }


  render(){

    const items = this.resources.map((resource) => {
      return this.props.onlyOne ?
        <ResourceRadioItem
          {...resource}
          key={resource._id}
          checked={resource._id === this.state.keyChecked}
          onRadioClick={handleRadioGroup.bind(this)}/>
      :
        <ResourceCheckBoxItem {...resource} key={resource._id}/>
    })

    const sortBy = ['Name', 'Measurement Unit'];

    return(
        <div className='mselector-wrapper'>
          <div className='mselector-list'>

            <SelectorHeader
              vID='resource-list'
              title='Resources'
              sortBy={sortBy}
              backTouched={this.props.onRequestChange}/>

            <MVirtualList id='resource-list'>
              {items}
            </MVirtualList>

          </div>
        </div>
    )
  }
}
