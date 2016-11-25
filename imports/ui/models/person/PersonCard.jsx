import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MAvatar from '../../structure/mavatar/MAvatar';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import classnames from 'classnames';

import {alphaImageColor} from '../../structure/app/RandomColor.js';
import MCard from '../../structure/mcard/MCard'

export default class PersonCard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {
      firstName,
      lastName,
      company,
      email,
      telephones,
      addresses,
      avatarURL,
      actionLabel,
      ...others
    } = this.props

    const title = `${firstName} ${lastName}`
    const char = title.toUpperCase().charAt(0)

    return(
      <MCard>

        <div className='card-top'>
          <MAvatar className='card-avatar'
            style={{marginRight: '15px', padding: '1px 0 0 1px'}}
            size={56} cha={char} src={avatarURL}/>
          <CardTitle className='card-title' title={title} subtitle={company}/>
        </div>

        <EmailSection email={email} />

        <TelephonesSection telephones={telephones} />

        <AddressesSection addresses={addresses} />


        <CardActions className='card-actions'>
          <FlatButton className='action' label={actionLabel} />
        </CardActions>

      </MCard>
    )
  }
}



/*
  @params: {
      email: String
    }
*/
const EmailSection = (props) => {
  const hasEmail = (props.email && props.email.length > 0)
  const eClasses = classnames('sinfo', {'empty': !hasEmail} )
  const iconClasses = classnames('sicon', {'empty': !hasEmail})

  const ai = []
  if(hasEmail){
    ai.push({email: props.email})
  }

  return(
    <ScrollableInfo arrayInfo={ai} icon={<CommunicationEmail className={iconClasses}/>}>
      <div className={eClasses}>
        <span>
          Email
        </span>
        {props.email}
      </div>
    </ScrollableInfo>
  )
}

/*
  @params: {
      {
        name: String
        number: String
      }
    }
*/
const TelephonesSection = (props) => {
  const hasTelephones = (props.telephones.length > 0)
  const eClasses = classnames('sinfo', {'empty': !hasTelephones} )
  const iconClasses = classnames('sicon', {'empty': !hasTelephones})

  if(!hasTelephones){
    props.telephones.push({})
  }

  let key = 'a'
  const tels = props.telephones.map((telephone) => {
    key+='b'
    return(
      <div className={eClasses} key={key}>
        <span>
          {telephone.name ? telephone.name : 'Telephone'}
        </span>
        {telephone.number}
      </div>
    )
  })

  return (
    <ScrollableInfo arrayInfo={props.telephones} icon={<CommunicationCall className={iconClasses}/>}>
      {tels}
    </ScrollableInfo>
  )
}

/*
  @params: {
      {
        name: String
        street1: String
        street2: String
        city: String
        state: String
        zip_code: String
        country: String

      }
    }
*/
const AddressesSection = (props) => {
  const hasAddresses = (props.addresses.length > 0)
  const eClasses = classnames('sinfo', {'empty': !hasAddresses} )
  const iconClasses = classnames('sicon', {'empty': !hasAddresses})

  if(!hasAddresses){
    props.addresses.push({})
  }

  let key = 'a'
  const adds = props.addresses.map((address) => {
    key+= 'b'
    return(
      <div className={eClasses} key={key}>
        <span>
          {address.name ? address.name : 'Address'}
        </span>
        {address.street1}
        <div> {address.street2} </div>
        <div>
          {address.city}
          {address.state && address.city &&
             <i>, </i>
          }
          {address.state}
        </div>
        <div> {address.zip_code} </div>
        <div> {address.country} </div>
      </div>
    )
  });

  return (
    <ScrollableInfo arrayInfo={props.addresses} icon={<MapsPlace className={iconClasses}/>}>
      {adds}
    </ScrollableInfo>
  )
}



class ScrollableInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {current: 0};

    this.handleRight = this.handleRight.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
  }

  handleRight(event){
    let c = this.state.current;
    if(c < this.props.arrayInfo.length - 1){
      this.setState({current: c+1})
    }
  }

  handleLeft(event){
    let c = this.state.current;
    if(c > 0){
      this.setState({current: c-1})
    }
  }

  render(){
    const arClasses = classnames('snav', {'disabled': this.state.current === this.props.arrayInfo.length - 1});
    const alClasses = classnames('snav', {'disabled': this.state.current === 0});
    const traStyle = {transform: `translate(-${100 * this.state.current}%, 0)`}


    return(
      <div className='scrollable-info'>

        {this.props.icon}

        <div className='slist'>
          <div className='swrapper' style={traStyle}>
            {this.props.children}
          </div>
        </div>


        {this.props.arrayInfo.length > 1 &&
          <div className='snav'>
            <HardwareKeyboardArrowLeft className={alClasses} onTouchTap={this.handleLeft}/>
            <HardwareKeyboardArrowRight className={arClasses} onTouchTap={this.handleRight}/>
          </div>
        }
      </div>
    )
  }
}
