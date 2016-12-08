import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { factoryMovement } from '../faker/factoryMovement.js';
import MovementCard from '../card/MovementCard';



export default class MovementsIndex extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let movements = [];

    for(let i = 0; i < 20; i++){
        movements.push(factoryMovement());
    }

    movements.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

    const listItems = movements.map((movement) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={movement._id}>
        <MovementCard {...movement} />
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

        <div key='movements-index' className='row is-flex'>
          {listItems}
        </div>


      </ReactCSSTransitionGroup>

    );
  }
}
