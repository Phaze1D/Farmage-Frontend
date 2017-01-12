import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';

import {factoryProduct} from '../faker/factoryProduct';


export default class ProductShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this)

    this.product = factoryProduct();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  render(){

    return(
      <MShow
        onFabClick={this.props.onFabClick}
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

      </MShow>
    )
  }
}
