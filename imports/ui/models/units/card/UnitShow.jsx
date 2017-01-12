import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';

import {factoryUnit} from '../faker/factoryUnit';


export default class UnitShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this)

    this.unit = factoryUnit();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  render(){

    return(
      <MShow
        onFabClick={this.props.onFabClick}
        title={this.unit.name}
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
