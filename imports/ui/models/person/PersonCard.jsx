import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import MAvatar from '../../structure/mavatar/MAvatar';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import SwipeableViews from 'react-swipeable-views';
import { browserHistory } from 'react-router'

import classnames from 'classnames';

import MCard from '../../structure/mcard/MCard';
import CustomerShow from '../customers/show/CustomerShow';
import PersonShow from './PersonShow';


export default class PersonCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {showCard: false, isOpened: false}

    this.handleOnShow = this.handleOnShow.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this)
    this.cardOptions = this.cardOptions.bind(this)

  }

  handleOnShow(event){
    if(this.state.showCard){
      this.setState({showCard: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showCard: true, isOpened: true})
    }
  }

  handleUpdate(){
    this.props.onRequestUpdate(this.props._id)
  }

  cardOptions(){
    return [
      <MenuItem key='expand' primaryText="Expand" leftIcon={<FullScreen />} />,
      <MenuItem key='edit' primaryText="Edit" leftIcon={<ImageEdit />} onTouchTap={this.handleUpdate}/>,
      <Divider key='divider'/>,
      <MenuItem key='delete' primaryText="Delete" leftIcon={<ActionDelete />} />,
    ]
  }

  render(){
    let {
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

    if(lastName === undefined) lastName = '';
    const title = `${firstName} ${lastName}`
    const char = title.toUpperCase().charAt(0)


    return(
      <MCard ref='mcard' options={this.cardOptions()}>

        <div className='card-top' onTouchTap={this.handleOnShow}>
          <MAvatar className='card-avatar'
            style={{marginRight: '15px', padding: '1px 0 0 1px'}}
            size={56} cha={char} src={avatarURL}/>
          <CardTitle className='card-title' title={title} subtitle={company}/>
        </div>

        <EmailSection email={email} />

        <TelephonesSection telephones={telephones} />

        <AddressesSection addresses={addresses} />


        <CardActions className='card-actions'>
          <FlatButton className='action' label={actionLabel} secondary={true}
            onTouchTap={() => {browserHistory.push('/' + actionLabel)} }/>
        </CardActions>

        <AutoLockScrolling lock={this.state.showCard}/>

        {this.state.isOpened &&
          <CustomerShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShow}
            open={this.state.showCard}/>
        }


      </MCard>
    )
  }
}


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
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  handleSwipe(index, indexLatest){
    this.setState({current: index})
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


    return(
      <div className='scrollable-info'>

        {this.props.icon}

        <SwipeableViews
          resistance={false}
          onChangeIndex={this.handleSwipe}
          index={this.state.current}
          className='slist'>
          {this.props.children}
        </SwipeableViews>


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


// <div className='slist'>
//   <div className='swrapper' style={traStyle}>
//     {this.props.children}
//   </div>
// </div>
