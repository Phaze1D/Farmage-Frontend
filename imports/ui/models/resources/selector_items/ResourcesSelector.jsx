import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ResourceItem from './ResourceItem';
import SelectorHeader from '../../../structure/mselector_list/SelectorHeader';
import MVirtualList from '../../../structure/mvirtual_list/MVirtualList';
import {factoryResource} from '../faker/factoryResource.js'



export default class ResourcesSelector extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    const resources = []

    for (var i = 0; i < 20; i++) {
      resources.push(factoryResource())
    }

    const items = resources.map((resource) =>
      <ResourceItem key={resource._id} {...resource}/>
    )

    return(
      <div className='mselector-wrapper'>
        <div className='mselector-list'>

          <SelectorHeader
            title='Resources'
            backTouched={this.props.onRequestChange}/>

          <MVirtualList>
            {items}
          </MVirtualList>

        </div>
      </div>
    )
  }
}
