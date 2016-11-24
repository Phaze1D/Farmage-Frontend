import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import faker from 'faker'
import classnames from 'classnames';

import {randomImageColor, alphaImageColor} from '../../structure/app/RandomColor.js';
import MCard from '../../structure/mcard/MCard'


function testEmail(){
  var result = []
  for(i = 0; i < Math.round(Math.random()); i++){
    let email = {name: 'Email', email: faker.internet.email()}
    result.push(email)
  }
  return result;
}

function testTelephone(){
  var result = []
  for(i = 0; i < Math.round(Math.random()*6); i++){
    let telephone = {}
    if(Math.round(Math.random()) === 1) telephone.name = faker.random.word();
    telephone.number = faker.phone.phoneNumber()
    result.push(telephone)
  }
  return result;
}

function testAddress(){
  var result = []
  for(i = 0; i < Math.round(Math.random()*5); i++){
    let address = {}
    if(Math.round(Math.random()) === 1) address.name = faker.random.word();
    address.street1 = faker.address.streetAddress()
    if(Math.round(Math.random()) === 1) address.street2 = faker.address.secondaryAddress();
    if(Math.round(Math.random()) === 1) address.city = faker.address.city();
    if(Math.round(Math.random()) === 1) address.state = faker.address.state();
    if(Math.round(Math.random()) === 1) address.zip_code = faker.address.zipCode();
    if(Math.round(Math.random()) === 1) address.country = faker.address.country();

    result.push(address)
  }
  return result;
}



export default class PersonCard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const char = this.props.title.toUpperCase().charAt(0)

    return(
      <MCard>

        <IconButton className='card-options'>
          <NavigationMoreVert/>
        </IconButton>

        <div className='card-top'>
          <Avatar className='card-avatar'
            backgroundColor={alphaImageColor(char)}
            style={{marginRight: '15px', padding: '1px 0 0 1px'}}
            size={56}>{char}</Avatar>
          <CardTitle className='card-title' title={this.props.title} subtitle={this.props.company}/>
        </div>

        <ScrollableInfo
          defaultTitle='Email'
          arrayInfo={testEmail()}
          type={0}
          icon={<CommunicationEmail/>}/>

        <ScrollableInfo
          defaultTitle='Telephone'
          arrayInfo={testTelephone()}
          type={1}
          icon={<CommunicationCall/>}/>

        <ScrollableInfo
          defaultTitle='Address'
          type={2}
          arrayInfo={testAddress()}
          icon={<MapsPlace/>}/>

        <CardActions className='card-actions'>
          <FlatButton className='action' label="Sells" />
        </CardActions>

      </MCard>
    )
  }
}


class ScrollableInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {current: 0};

    this.handleRight = this.handleRight.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
  }

  handleRight(event){
    c = this.state.current;
    if(c < this.props.arrayInfo.length - 1){
      this.setState({current: c+1})
    }
  }

  handleLeft(event){
    c = this.state.current;
    if(c > 0){
      this.setState({current: c-1})
    }
  }

  infoSection(){
    if(this.props.arrayInfo.length > 1){

      const listItems = this.props.arrayInfo.map((obj) => {
        if(this.props.type === 0){
          return(<EmailSection email={obj} defaultTitle={this.props.defaultTitle} key={obj.email}/>)
        }

        if(this.props.type === 1){
          return(<TelephoneSection telephone={obj} defaultTitle={this.props.defaultTitle} key={obj.number}/>)
        }

        if(this.props.type === 2){
          return(<AddressSection address={obj} defaultTitle={this.props.defaultTitle} key={obj.street1}/>)
        }
      });

      const traStyle = {transform: `translate(-${100 * this.state.current}%, 0)`}
      return (
        <div className='slist'>
          <div className='swrapper' style={traStyle}>
            {listItems}
          </div>
        </div>
      )

    }else if(this.props.arrayInfo.length == 1){
      let obj = this.props.arrayInfo[0]
      if(this.props.type === 0){
        return(<EmailSection email={obj} defaultTitle={this.props.defaultTitle}/>)
      }

      if(this.props.type === 1){
        return(<TelephoneSection telephone={obj} defaultTitle={this.props.defaultTitle}/>)
      }

      if(this.props.type === 2){
        return(<AddressSection address={obj} defaultTitle={this.props.defaultTitle}/>)
      }

    }else{
      return(
        <div className='sinfo empty'>
          <span>
            {this.props.defaultTitle}
          </span>

        </div>
      )
    }
  }

  render(){
    const iconClasses = classnames('sicon', {'empty': this.props.arrayInfo.length == 0});
    const arClasses = classnames('snav', {'disabled': this.state.current === this.props.arrayInfo.length - 1});
    const alClasses = classnames('snav', {'disabled': this.state.current === 0});

    return(
      <div className='scrollable-info'>
        {React.cloneElement(this.props.icon, { className: iconClasses })}
        {this.infoSection()}

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


const EmailSection = (props) => (
  <div className='sinfo ib'>
    <span>
      {props.email.name ? props.email.name : props.defaultTitle}
    </span>
    {props.email.email}
  </div>
)

const TelephoneSection = (props) => (
  <div className='sinfo ib'>
    <span>
      {props.telephone.name ? props.telephone.name : props.defaultTitle}
    </span>
    {props.telephone.number}
  </div>
)

const AddressSection = (props) => (
  <div className='sinfo ib'>
    <span>
      {props.address.name ? props.address.name : props.defaultTitle}
    </span>

    {props.address.street1}

    {props.address.street2 &&
      <div> {props.address.street2} </div>
    }

    <div>
      {props.address.city}
      {props.address.state && props.address.city &&
         <i>, </i>
      }
      {props.address.state}
    </div>

    {props.address.zip_code &&
      <div> {props.address.zip_code} </div>
    }

    {props.address.country &&
      <div> {props.address.country} </div>
    }

  </div>
)
