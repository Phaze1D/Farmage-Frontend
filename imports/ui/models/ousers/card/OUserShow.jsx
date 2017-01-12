import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';

import {factoryOUser} from '../faker/factoryOUser';


export default class OUserShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this)

    this.ouser = factoryOUser();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  render(){
    if(this.ouser.lastName === undefined) this.ouser.lastName = '';
    const title = `${this.ouser.firstName} ${this.ouser.lastName}`

    return(
      <MShow
        onFabClick={this.props.onFabClick}
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
          tabs={['Summary', 'Reports', 'Analyzes']}/>

      </MShow>
    )
  }
}
