import React from 'react';
import OUserCard from '../card/OUserCard'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factoryOUser} from '../faker/factoryOUser.js'



export default class OUsersIndex extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let ousers = [];

    for(let i = 0; i < 10; i++){
        ousers.push(factoryOUser());
    }

    ousers.sort((a, b) => {
      return a.firstName.localeCompare(b.firstName)
    });

    const listItems = ousers.map((person) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={person._id}>
        <OUserCard {...person} actionLabel='sells' />
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

        <div key='ousers-index' className='row is-flex'>
          {listItems}
        </div>

      </ReactCSSTransitionGroup>

    );
  }
}
