import React from 'react';
import {RadioButton} from 'material-ui/RadioButton';
import {ProductCheckBoxItem, ProductRadioItem} from './ProductItems';
import SelectorHeader, {handleRadioGroup} from '../../../structure/mselector_list/SelectorHeader';
import MVirtualList from '../../../structure/mvirtual_list/MVirtualList';
import {factoryProduct} from '../faker/factoryProduct.js'



export default class ProductsSelectorList extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: 10, keyChecked: null};

    this.products = []
    for (let i = 0; i < this.state.count; i++) {
      this.products.push(factoryProduct())
    }
  }


  render(){

    const items = this.products.map((product) => {
      return this.props.onlyOne ?
        <ProductRadioItem
          {...product}
          key={product._id}
          checked={product._id === this.state.keyChecked}
          onRadioClick={handleRadioGroup.bind(this)}/>
      :
        <ProductCheckBoxItem {...product} key={product._id}/>
    })

    const sortBy = ['Name', 'SKU'];

    return(
        <div className='mselector-wrapper'>
          <div className='mselector-list'>

            <SelectorHeader
              vID='product-list'
              title='Products'
              sortBy={sortBy}
              backTouched={this.props.onRequestChange}/>

            <MVirtualList id='product-list'>
              {items}
            </MVirtualList>

          </div>
        </div>
    )
  }
}
