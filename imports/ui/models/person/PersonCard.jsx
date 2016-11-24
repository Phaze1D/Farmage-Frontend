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


        <CardActions className='card-actions'>
          <FlatButton className='action' label={actionLabel} />
        </CardActions>

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
    ai.push({name: props.name, email: props.email})
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
  const tClasses = classnames('sinfo', {'empty': !hasTelephones} )
  const iconClasses = classnames('sicon', {'empty': !hasTelephones})

  const tels = props.telephones.map((to) => (

  ))

}

const AddressesSection = (props) => {

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














// class ScrollableInfo extends React.Component{
//   constructor(props){
//     super(props)
//     this.state = {current: 0};
//
//     this.handleRight = this.handleRight.bind(this);
//     this.handleLeft = this.handleLeft.bind(this);
//   }
//
//   handleRight(event){
//     c = this.state.current;
//     if(c < this.props.arrayInfo.length - 1){
//       this.setState({current: c+1})
//     }
//   }
//
//   handleLeft(event){
//     c = this.state.current;
//     if(c > 0){
//       this.setState({current: c-1})
//     }
//   }
//
//   infoSection(){
//     if(this.props.arrayInfo.length > 1){
//
//       const listItems = this.props.arrayInfo.map((obj) => {
//         if(this.props.type === 0){
//           return(<EmailSection email={obj} defaultTitle={this.props.defaultTitle} key={obj.email}/>)
//         }
//
//         if(this.props.type === 1){
//           return(<TelephoneSection telephone={obj} defaultTitle={this.props.defaultTitle} key={obj.number}/>)
//         }
//
//         if(this.props.type === 2){
//           return(<AddressSection address={obj} defaultTitle={this.props.defaultTitle} key={obj.street1}/>)
//         }
//       });
//
//       const traStyle = {transform: `translate(-${100 * this.state.current}%, 0)`}
//       return (
//         <div className='slist'>
//           <div className='swrapper' style={traStyle}>
//             {listItems}
//           </div>
//         </div>
//       )
//
//     }else if(this.props.arrayInfo.length == 1){
//       let obj = this.props.arrayInfo[0]
//       if(this.props.type === 0){
//         return(<EmailSection email={obj} defaultTitle={this.props.defaultTitle}/>)
//       }
//
//       if(this.props.type === 1){
//         return(<TelephoneSection telephone={obj} defaultTitle={this.props.defaultTitle}/>)
//       }
//
//       if(this.props.type === 2){
//         return(<AddressSection address={obj} defaultTitle={this.props.defaultTitle}/>)
//       }
//
//     }else{
//       return(
//         <div className='sinfo empty'>
//           <span>
//             {this.props.defaultTitle}
//           </span>
//
//         </div>
//       )
//     }
//   }
//
//   render(){
//     const iconClasses = classnames('sicon', {'empty': this.props.arrayInfo.length == 0});
//     const arClasses = classnames('snav', {'disabled': this.state.current === this.props.arrayInfo.length - 1});
//     const alClasses = classnames('snav', {'disabled': this.state.current === 0});
//
//     return(
//       <div className='scrollable-info'>
//         {React.cloneElement(this.props.icon, { className: iconClasses })}
//         {this.infoSection()}
//
//         {this.props.arrayInfo.length > 1 &&
//           <div className='snav'>
//             <HardwareKeyboardArrowLeft className={alClasses} onTouchTap={this.handleLeft}/>
//             <HardwareKeyboardArrowRight className={arClasses} onTouchTap={this.handleRight}/>
//           </div>
//         }
//       </div>
//     )
//   }
// }
//
//
// const EmailSection = (props) => (
//   <div className='sinfo ib'>
//     <span>
//       {props.email.name ? props.email.name : props.defaultTitle}
//     </span>
//     {props.email.email}
//   </div>
// )
//
// const TelephoneSection = (props) => (
//   <div className='sinfo ib'>
//     <span>
//       {props.telephone.name ? props.telephone.name : props.defaultTitle}
//     </span>
//     {props.telephone.number}
//   </div>
// )
//
// const AddressSection = (props) => (
//   <div className='sinfo ib'>
//     <span>
//       {props.address.name ? props.address.name : props.defaultTitle}
//     </span>
//
//     {props.address.street1}
//
//     {props.address.street2 &&
//       <div> {props.address.street2} </div>
//     }
//
//     <div>
//       {props.address.city}
//       {props.address.state && props.address.city &&
//          <i>, </i>
//       }
//       {props.address.state}
//     </div>
//
//     {props.address.zip_code &&
//       <div> {props.address.zip_code} </div>
//     }
//
//     {props.address.country &&
//       <div> {props.address.country} </div>
//     }
//
//   </div>
// )
