import React from 'react'
import SwipeableViews from 'react-swipeable-views';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import MShow from '../../../structure/mshow/MShow';
import MAvatar from '../../../structure/mavatar/MAvatar';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import MFade from '../../../structure/mfade/MFade';
import OrganizationsNew from '../new/OrganizationsNew';
import UserShowInfo from '../../ousers/UserShowInfo';


import {factoryOrganization} from '../faker/factoryOrganization';




export default class OrganizationShow extends React.Component{

  constructor(props){
    super(props)
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.toggleRight = this.toggleRight.bind(this);

    this.organization = factoryOrganization();
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

    return(
      <MShow
        ref='mshow'
        onFabClick={this.toggleRight}
        title={this.organization.name}
        subTitle=''
        hasFAB={true}
        hasAvatar={true}
        avatarURL={this.organization.avatarURL}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary', 'Analytics']}/>


        <SwipeableViews onChangeIndex={this.handleSwipe} index={this.state.tabValue} animateHeight={false}>
          <MFade>
            <OrganizationSummary organization={this.organization}/>
          </MFade>


        </SwipeableViews>



        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <OrganizationsNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Organization'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>

    )
  }

}


let OrganizationSummary = (props) => {

  const {
    organization
  } = props

  let emaClas = 'mtab-info';
  let email = organization.email;



  if( !(email && email.length > 0) ){
    email = 'Empty'
    emaClas = 'mtab-info none'
  }


  const addressList = organization.addresses.map((address) =>
    <Address key={Random.id()} {...address}/>
  )

  const telephoneList = organization.telephones.map((telephone) =>
    <Telephone key={Random.id()} {...telephone}/>
  )


  return(
    <div className='mtab-content'>
      <h3>Contact Information</h3>

      <div className='mtab-show-flex'>
        <div className='mtab-content-card'>
          <div className='mtab-info'>
            <span>Name</span>
            {organization.name}
          </div>

          <div className='mtab-info'>
            <span>Founder</span>
            David Villarreal
          </div>

          <div className={emaClas} >
            <span>Email</span>
            {email}
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
        <UserShowInfo user={organization.createdBy} subTitle='Created' date={organization.createdAt}/>
        <UserShowInfo user={organization.updatedBy} subTitle='Updated' date={organization.updatedAt}/>
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
