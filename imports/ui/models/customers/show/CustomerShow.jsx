import React from 'react';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import MAvatar from '../../../structure/mavatar/MAvatar';
import PersonNew from '../../person/PersonForm';
import UserShowInfo from '../../ousers/UserShowInfo';

import {factoryPerson} from '../../person/faker/factoryPerson';


let DateTimeFormat = global.Intl.DateTimeFormat;


export default class CustomerShow extends React.Component{
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
          tabs={['Summary', 'Reports', 'Analyzes']}/>


        <SwipeableViews onChangeIndex={this.handleSwipe} index={this.state.tabValue}>
          <CustomerSummary customer={this.person}/>
          <div>Reports</div>
          <div>Analyzes</div>
        </SwipeableViews>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <PersonNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Customer'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>
      </MShow>
    )
  }
}


class CustomerSummary extends React.Component {
  constructor(props) {
    super(props)

  }

  render(){
    const {
      customer
    } = this.props

    let comClas = 'mtab-info';
    let company = customer.company;
    let emaClas = 'mtab-info';
    let email = customer.email;
    let notClas = 'mtab-info text-wrap';
    let notes = customer.notes;

    if( !(company && company.length > 0) ){
      company = 'Empty'
      comClas = 'mtab-info none'
    }

    if( !(email && email.length > 0) ){
      email = 'Empty'
      emaClas = 'mtab-info none'
    }

    if( !(notes && notes.length > 0) ){
      notes = 'Empty'
      notClas = 'mtab-info none'
    }

    const addressList = customer.addresses.map((address) =>
      <Address key={Random.id()} {...address}/>
    )

    const telephoneList = customer.telephones.map((telephone) =>
      <Telephone key={Random.id()} {...telephone}/>
    )


    return(
      <div className='mtab-content'>
        <h3>Contact Information</h3>

        <div className='mtab-show-flex'>
          <div className='mtab-content-card'>
            <div className='mtab-info'>
              <span>Full Name</span>
              {customer.firstName} {customer.lastName}
            </div>


            <div className={comClas}>
              <span>Company</span>
              {company}
            </div>

            <div className={emaClas} style={{marginBottom: '0'}}>
              <span>Email</span>
              {email}
            </div>
          </div>

          <div className='mtab-content-card'>
            <div className={notClas}>
              <span>Notes</span>
              {notes}
            </div>
          </div>
        </div>

        <h4>Addresses</h4>

        <div className='mtab-show-flex'>
          {addressList.length > 0 ? addressList : <h4 className='none'>Missing Empty State</h4>}
        </div>

        <h4>Telephones</h4>

        <div className='mtab-show-flex'>
          {telephoneList.length > 0 ? telephoneList : <h4 className='none'>Missing Empty State</h4>}
        </div>

        <h3 style={{marginTop: '25px'}}>User Information</h3>

        <div className='mtab-show-flex'>
          <UserShowInfo user={customer.createdBy} subTitle='Created' date={customer.createdAt}/>
          <UserShowInfo user={customer.updatedBy} subTitle='Updated' date={customer.updatedAt}/>
        </div>
      </div>
    )
  }
}

let Address = (props) => {

  return(
    <div className='mtab-content-card flex'>
      <MapsPlace className='sicon' style={{alignSelf: 'center'}}/>
      <div className='sinfo' style={{fontSize: '15px', height: 'auto'}}>
        <span style={{fontSize: '13px'}}>
          {props.name ? props.name : 'Address'}
        </span>
        {props.street1}
        <div> {props.street2} </div>
        <div>
          {props.city}
          {props.state && props.city &&
             <i>, </i>
          }
          {props.state}
        </div>
        <div> {props.zip_code} </div>
        <div> {props.country} </div>
      </div>


    </div>
  )
}

let Telephone = (props) => (
  <div className='mtab-content-card flex'>
    <CommunicationCall className='sicon' style={{alignSelf: 'center'}}/>
    <div className='sinfo' style={{fontSize: '15px', height: 'auto'}}>
      <span style={{fontSize: '13px'}}>
        {props.name ? props.name : 'Telephone'}
      </span>
      {props.number}
    </div>
  </div>
)


// Notes
// Email
// Telephones
// Addresses
// Created By
// Updated By
// Last Sell
// Total Spent
// Average Total Per Sale
// Top 5 Products
