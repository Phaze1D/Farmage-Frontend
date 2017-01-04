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
    this.onCardUpdate = this.onCardUpdate.bind(this);
  }

  onCardUpdate(product_id){
    this.refs.dashboard.toggleRight(product_id, 'Update Product');
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
        <ProductCard {...product} onRequestUpdate={this.onCardUpdate}/>
      </div>
    );

    const right = <ProductsNew/>;
    const filter = <ProductsFilter/>;

    return (
      <Dashboard
        defaultRightTitle='New Product'
        headerTitle='Products'
        showMFAB={true}
        right={right}
        filter={filter}
        ref='dashboard'
        key='main-dash'>

        <MVirtualGrid>
          {listItems}
        </MVirtualGrid>

      </Dashboard>

    );
  }
}
