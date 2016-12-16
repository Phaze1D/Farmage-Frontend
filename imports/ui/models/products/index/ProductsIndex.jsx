import React from 'react';
import {factoryProduct} from '../faker/factoryProduct.js';
import ProductCard from '../card/ProductCard';
import ProductsNew from '../new/ProductsNew';
import ProductsFilter from '../filter/ProductsFilter';
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';



export default class ProductsIndex extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let products = [];

    for(let i = 0; i < 20; i++){
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

    const right = <ProductsNew/>;
    const filter = <ProductsFilter/>;

    return (
      <Dashboard showMFAB={true} right={right} filter={filter} key='main-dash'>

        <MVirtualGrid>
          {listItems}
        </MVirtualGrid>

      </Dashboard>

    );
  }
}
