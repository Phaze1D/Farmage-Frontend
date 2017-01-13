import React from 'react';
import MShow from '../../structure/mshow/MShow';
import MTabs from '../../structure/mtabs/MTabs';
import RightDrawer from '../../structure/right_drawer/RightDrawer';
import PersonNew from './PersonForm';

import {factoryPerson} from './faker/factoryPerson';


export default class PersonShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this)
    this.toggleRight = this.toggleRight.bind(this);

    this.person = factoryPerson();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  toggleRight(event){
    this.setState({ropen: !this.state.ropen})
  }

  render(){
    if(this.person.lastName === undefined) this.person.lastName = '';
    const title = `${this.person.firstName} ${this.person.lastName}`

    return(
      <MShow
        onFabClick={this.toggleRight}
        title={title}
        subTitle={this.person.company}
        hasFAB={true}
        hasAvatar={true}
        avatarURL={this.person.avatarURL}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary', 'Reports', 'Analyzes']}/>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <PersonNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Person'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>
    )
  }
}
