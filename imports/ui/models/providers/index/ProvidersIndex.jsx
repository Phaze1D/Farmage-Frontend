import React from 'react';
import PersonCard from '../../person/PersonCard'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factoryPerson} from '../../person/faker/factoryPerson.js'



export default class ProvidersIndex extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let providers = [];

    for(let i = 0; i < 20; i++){
        providers.push(factoryPerson());
    }

    providers.sort((a, b) => {
      return a.firstName.localeCompare(b.firstName)
    });

    const listItems = providers.map((person) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={person._id}>
        <PersonCard {...person} actionLabel='expenses' />
      </div>
    );

    return (
      <ReactCSSTransitionGroup
        transitionName={ {
          enter: 'enter-index',
          leave: 'leave-index',
          appear: 'appear-index'
        } }
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
        transitionAppear={true}
        transitionAppearTimeout={400}>

        <div key='providers-index' className='row is-flex'>
          {listItems}
        </div>

      </ReactCSSTransitionGroup>
    );
  }
}
