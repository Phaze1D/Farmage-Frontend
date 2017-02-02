import React from 'react';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import PersonNew from '../../person/PersonForm';
import UserShowInfo from '../../ousers/UserShowInfo';
import PersonSummary from '../../person/PersonSummary';
import {factoryPerson} from '../../person/faker/factoryPerson';
import MFade from '../../../structure/mfade/MFade';
import ProviderAnalytics from './ProviderAnalytics';



let DateTimeFormat = global.Intl.DateTimeFormat;


export default class ProviderShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleSwipe = this.handleSwipe.bind(this);
    this.toggleRight = this.toggleRight.bind(this);

    this.person = factoryPerson();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  handleSwipe(index, indexLatest){
    this.setState({tabValue: index})
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
          tabs={['Summary', 'Analytics', 'Reports']}/>


          <SwipeableViews onChangeIndex={this.handleSwipe} index={this.state.tabValue}>
            <MFade>
              <PersonSummary person={this.person}/>
            </MFade>

            <ProviderAnalytics provider={this.person}/>
            <div>Reports</div>
          </SwipeableViews>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <PersonNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Provider'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>
      </MShow>
    )
  }
}




// Description
// Email
// Telephones
// Addresses
// Created By
// Updated By
// Last Sell
// Total Spent
// Average Total Per Sale
// Top 5 Products
