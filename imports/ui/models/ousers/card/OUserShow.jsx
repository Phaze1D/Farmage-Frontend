import React from 'react';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import TrackOn from 'material-ui/svg-icons/image/lens';
import TrackOff from 'material-ui/svg-icons/image/panorama-fish-eye';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import MAvatar from '../../../structure/mavatar/MAvatar';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import UserShowInfo from '../../ousers/UserShowInfo';
import OUsersNew from '../new/OUsersNew';
import MFade from '../../../structure/mfade/MFade';

import classnames from 'classnames'


import {factoryOUser} from '../faker/factoryOUser';


export default class OUserShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.toggleRight = this.toggleRight.bind(this);


    this.ouser = factoryOUser();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
    if(this.refs.mshow && value !== 0){
      this.refs.mshow.hideFAB()
    }else if (this.refs.mshow && value === 0) {
      this.refs.mshow.showFAB()
    }
  }

  handleSwipe(value, indexLatest){
    this.setState({tabValue: value})
    if(this.refs.mshow && value !== 0){
      this.refs.mshow.hideFAB()
    }else if (this.refs.mshow && value === 0) {
      this.refs.mshow.showFAB()
    }
  }

  toggleRight(event){
    this.setState({ropen: !this.state.ropen})
  }

  render(){
    if(this.ouser.lastName === undefined) this.ouser.lastName = '';
    const title = `${this.ouser.firstName} ${this.ouser.lastName}`

    return(
      <MShow
        ref='mshow'
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
          tabs={['Summary', 'Tables']}/>

        <MFade>
          <SwipeableViews onChangeIndex={this.handleSwipe} index={this.state.tabValue} animateHeight={false}>
            <OUserSummary ouser={this.ouser}/>
            <div>Tables</div>
          </SwipeableViews>
        </MFade>

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


let OUserSummary = (props) => {

  let {
    ouser
  } = props

  const permissions = ouser.permissions

  const addressList = ouser.addresses.map((address) =>
    <Address key={Random.id()} {...address}/>
  )

  const telephoneList = ouser.telephones.map((telephone) =>
    <Telephone key={Random.id()} {...telephone}/>
  )

  return(
    <div className='mtab-content'>
      <h3>Information</h3>

      <div className='mtab-show-flex'>
        <div className='mtab-content-card'>
          <div className='mtab-info'>
            <span>Full Name</span>
            {ouser.firstName} {ouser.lastName}
          </div>

          <div className='mtab-info' >
            <span>Email</span>
            {ouser.email}
          </div>
        </div>

        <div className='mtab-content-card flex-column'>

          <div className={classnames('mtab-info bool', {'on': permissions.owner})}>
            <span>Owner</span>
            {permissions.owner ? <TrackOn/> : <TrackOff/>}
          </div>

          <div className={classnames('mtab-info bool', {'on': permissions.viewer})}>
            <span>Viewer</span>
            {permissions.viewer ? <TrackOn/> : <TrackOff/>}
          </div>

          <div className={classnames('mtab-info bool', {'on': permissions.sellsManager})}>
            <span>Sell Manager</span>
            {permissions.sellsManager ? <TrackOn/> : <TrackOff/>}
          </div>

          <div className={classnames('mtab-info bool', {'on': permissions.unitsManager})}>
            <span>Sector Manager</span>
            {permissions.unitsManager ? <TrackOn/> : <TrackOff/>}
          </div>

          <div className={classnames('mtab-info bool', {'on': permissions.expensesManager})}>
            <span>Expense Manager</span>
            {permissions.expensesManager ? <TrackOn/> : <TrackOff/>}
          </div>

          <div className={classnames('mtab-info bool', {'on': permissions.batchesManager})}>
            <span>Batch Manager</span>
            {permissions.batchesManager ? <TrackOn/> : <TrackOff/>}
          </div>

          <div className={classnames('mtab-info bool', {'on': permissions.usersManager})}>
            <span>User Manager</span>
            {permissions.usersManager ? <TrackOn/> : <TrackOff/>}
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

      <h3 style={{marginTop: '25px'}}>Invited Information</h3>

      <div className='mtab-show-flex'>
        <UserShowInfo user={ouser.invitedBy} subTitle='Invited' date={ouser.createdAt}/>
      </div>

    </div>
  )
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
