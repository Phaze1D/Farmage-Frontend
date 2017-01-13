import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import YieldsNew from '../new/YieldsNew';

import {factoryYield} from '../faker/factoryYield';


export default class YieldShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this)
    this.toggleRight = this.toggleRight.bind(this);

    this.yield = factoryYield();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  toggleRight(event){
    this.setState({ropen: !this.state.ropen})
  }

  render(){
    const title = this.yield.identifer ? this.yield.identifer : this.yield._id

    return(
      <MShow
        onFabClick={this.toggleRight}
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

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <YieldsNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Yield'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>
    )
  }
}
