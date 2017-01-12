import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';

import {factoryYield} from '../faker/factoryYield';


export default class YieldShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this)

    this.yield = factoryYield();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  render(){
    const title = this.yield.identifer ? this.yield.identifer : this.yield._id

    return(
      <MShow
        onFabClick={this.props.onFabClick}
        title={title}
        subTitle='Yield Identifer'
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
