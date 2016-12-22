import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MAvatar from '../../../structure/mavatar/MAvatar';

let DateTimeFormat = global.Intl.DateTimeFormat;


export class InventoryCheckBoxItem extends React.Component{
  constructor(props){
    super(props)
    this.state = {checked: false}

    this.toggleChecked = this.toggleChecked.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.checked != this.state.checked
  }

  toggleChecked(event){
    event.stopPropagation();
    event.preventDefault();
    this.setState({checked: !this.state.checked})
  }

  render(){
    const {
      _id,
      identifer,
      amount,
      createdAt,
      expiresAt,
      product,
      ...others
    } = this.props;

    let title = identifer && identifer.length > 0 ? identifer : _id;

    let expireDateString = null;
    if(expiresAt){
      expireDateString = new DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(expiresAt);
    }else{
      expireDateString = 'Never'
    }

    return(
      <div className='sitem' onTouchTap={this.toggleChecked}>
        <Checkbox onTouchTap={this.toggleChecked} checked={this.state.checked} className='schecker'/>

        <div className='slinfo'>
          {title}
          <span>
            {new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(createdAt)} - {expireDateString}
          </span>
        </div>

        <div className='slinfo-2'>
          {amount}
        </div>

      </div>
    )
  }
}


export class InventoryRadioItem extends React.Component{
  constructor(props){
    super(props)

    this.handleRadioClick = this.handleRadioClick.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.checked != this.props.checked;
  }

  handleRadioClick(event){
    this.props.onRadioClick(event, this.props._id)
  }

  render(){
    const {
      _id,
      identifer,
      amount,
      createdAt,
      expiresAt,
      product,
      ...others
    } = this.props;

    let title = identifer && identifer.length > 0 ? identifer : _id;

    let expireDateString = null;
    if(expiresAt){
      expireDateString = new DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(expiresAt);
    }else{
      expireDateString = 'Never'
    }

    return(
      <div className='sitem' onTouchTap={this.handleRadioClick}>
        <RadioButton onTouchTap={this.handleRadioClick} checked={this.props.checked} className='schecker'/>

        <div className='slinfo'>
          {title}
          <span>
            {new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(createdAt)} - {expireDateString}
          </span>
        </div>

        <div className='slinfo-2'>
          {amount}
        </div>

      </div>
    )
  }
}
