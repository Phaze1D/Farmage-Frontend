import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factoryResource} from '../faker/factoryResource.js'
import ResourceCard from '../card/ResourceCard';


export default class ResourcesIndex extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let resources = [];

    for(let i = 0; i < 10; i++){
        resources.push(factoryResource());
    }

    resources.sort((a, b) => {
      return a.name.localeCompare(b.name)
    });

    const listItems = resources.map((resource) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-4' key={resource._id}>
        <ResourceCard {...resource} />
      </div>
    );

    return (
      <ReactCSSTransitionGroup
        transitionName={ {
          enter: 'enter-index',
          leave: 'leave-index',
          appear: 'appear-index'
        } }
        transitionEnterTimeout={800}
        transitionLeaveTimeout={800}
        transitionAppear={true}
        transitionAppearTimeout={800}>

        <div className='row is-flex'>
          {listItems}
        </div>

      </ReactCSSTransitionGroup>

    );
  }
}
