import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import ProductsNew from '../new/ProductsNew';

import {factoryProduct} from '../faker/factoryProduct';


export default class ProductShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this)
    this.toggleRight = this.toggleRight.bind(this);

    this.product = factoryProduct();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  toggleRight(event){
    this.setState({ropen: !this.state.ropen})
  }

  render(){

    return(
      <MShow
        onFabClick={this.toggleRight}
        title={this.product.name}
        subTitle={this.product.sku}
        hasFAB={true}
        hasAvatar={true}
        avatarURL={this.product.imageUrl}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary', 'Resources', 'Reports', 'Analyzes']}/>



        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <ProductsNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Product'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>
    )
  }
}
