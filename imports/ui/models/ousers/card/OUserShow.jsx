import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import OUsersNew from '../new/OUsersNew';

import {factoryOUser} from '../faker/factoryOUser';


export default class OUserShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this)
    this.toggleRight = this.toggleRight.bind(this);


    this.ouser = factoryOUser();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  toggleRight(event){
    this.setState({ropen: !this.state.ropen})
  }

  render(){
    if(this.ouser.lastName === undefined) this.ouser.lastName = '';
    const title = `${this.ouser.firstName} ${this.ouser.lastName}`

    return(
      <MShow
        onFabClick={this.toggleRight}
        title={title}
        subTitle={this.ouser.email}
        hasFAB={true}
        hasAvatar={true}
        avatarURL={this.ouser.avatarURL}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary', 'Analytics', 'Reports']}/>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <OUsersNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Permissions'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>
    )
  }
}
