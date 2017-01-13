import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import UnitsNew from '../new/UnitsNew';

import {factoryUnit} from '../faker/factoryUnit';


export default class UnitShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this)
    this.toggleRight = this.toggleRight.bind(this);

    this.unit = factoryUnit();
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
        title={this.unit.name}
        hasFAB={true}
        hasAvatar={false}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary', 'Reports', 'Analyzes']}/>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <UnitsNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Unit'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>
    )
  }
}
