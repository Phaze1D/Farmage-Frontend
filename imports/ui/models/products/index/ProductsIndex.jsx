import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factoryProduct} from '../faker/factoryProduct.js';
import ProductCard from '../card/ProductCard';


export default class ProductsIndex extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let products = [];

    for(let i = 0; i < 30; i++){
        products.push(factoryProduct());
    }

    products.sort((a, b) => {
      return a.name.localeCompare(b.name)
    });

    const listItems = products.map((product) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-4' key={product._id}>
        <ProductCard {...product} />
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
