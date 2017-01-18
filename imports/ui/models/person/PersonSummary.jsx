import React from 'react';
import {Random} from 'meteor/random'
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import MAvatar from '../../structure/mavatar/MAvatar';
import UserShowInfo from '../ousers/UserShowInfo';



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class PersonSummary extends React.Component {
  constructor(props) {
    super(props)

  }

  render(){
    const {
      person
    } = this.props

    let comClas = 'mtab-info';
    let company = person.company;
    let emaClas = 'mtab-info';
    let email = person.email;
    let notClas = 'mtab-info text-wrap';
    let notes = person.notes;

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

    const addressList = person.addresses.map((address) =>
      <Address key={Random.id()} {...address}/>
    )

    const telephoneList = person.telephones.map((telephone) =>
      <Telephone key={Random.id()} {...telephone}/>
    )


    return(
      <div className='mtab-content'>
        <h3>Contact Information</h3>

        <div className='mtab-show-flex'>
          <div className='mtab-content-card'>
            <div className='mtab-info'>
              <span>Full Name</span>
              {person.firstName} {person.lastName}
            </div>


            <div className={comClas}>
              <span>Company</span>
              {company}
            </div>

            <div className={emaClas} >
              <span>Email</span>
              {email}
            </div>
          </div>

          <div className='mtab-content-card'>
            <div className={notClas}>
              <span>Description</span>
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
          <UserShowInfo user={person.createdBy} subTitle='Created' date={person.createdAt}/>
          <UserShowInfo user={person.updatedBy} subTitle='Updated' date={person.updatedAt}/>
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
