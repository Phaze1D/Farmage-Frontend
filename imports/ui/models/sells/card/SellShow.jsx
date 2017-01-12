import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';

import {factorySell} from '../faker/factorySell';


export default class SellShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this)

    this.sell = factorySell();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  render(){

    return(
      <MShow
        onFabClick={this.props.onFabClick}
        title={this.sell.reference}
        subTitle='Referecne ID'
        hasFAB={true}
        hasAvatar={false}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary', 'Reports', 'Analyzes']}/>

      </MShow>
    )
  }
}
