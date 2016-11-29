import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factoryYield} from '../faker/factoryYield.js'
import YieldCard from '../card/YieldCard'

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldsIndex extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let _yields = [];

    for(let i = 0; i < 10; i++){
        _yields.push(factoryYield());
    }

    _yields.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

    const listItems = _yields.map((_yield) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={_yield._id}>
        <YieldCard {..._yield} />
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
