import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import ResourcesNew from '../new/ResourcesNew';

import {factoryResource} from '../faker/factoryResource';


export default class ResourceShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this)
    this.toggleRight = this.toggleRight.bind(this);


    this.resource = factoryResource();
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


        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <ResourcesNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Resource'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>
    )
  }
}
