import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factoryInventory} from '../faker/factoryInventory.js';
import InventoryCard from '../card/InventoryCard';


export default class InventoriesIndex extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let inventories = [];

    for(let i = 0; i < 20; i++){
        inventories.push(factoryInventory());
    }

    inventories.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

    const listItems = inventories.map((inventory) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={inventory._id}>
        <InventoryCard {...inventory} />
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

        <div className='row is-flex'>
          {listItems}
        </div>


      </ReactCSSTransitionGroup>

    );
  }
}
