import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factorySell} from '../faker/factorySell.js';
import SellCard from '../card/SellCard';


export default class SellsIndex extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let sells = [];

    for(let i = 0; i < 20; i++){
        sells.push(factorySell());
    }

    sells.sort((a, b) => {
      return  a.createdAt - b.createdAt;
    });

    const listItems = sells.map((sell) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={sell._id}>
        <SellCard {...sell} />
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

        <div key='sells-grid' className='row is-flex'>
          {listItems}
        </div>

      </ReactCSSTransitionGroup>

    );
  }
}
