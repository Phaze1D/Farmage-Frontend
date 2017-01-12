import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';

import {factoryResource} from '../faker/factoryResource';


export default class ResourceShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this)

    this.resource = factoryResource();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  render(){

    return(
      <MShow
        onFabClick={this.props.onFabClick}
        title={this.resource.name}
        subTitle={this.resource.measurementUnit}
        hasFAB={true}
        hasAvatar={true}
        avatarURL={this.resource.imageUrl}
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
