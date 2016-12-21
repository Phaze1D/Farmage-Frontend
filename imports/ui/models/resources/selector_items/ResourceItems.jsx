import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MAvatar from '../../../structure/mavatar/MAvatar';

export class ResourceCheckBoxItem extends React.Component{
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
      name,
      measurementUnit,
      imageUrl,
      totalAmount,
      ...others
    } = this.props;

    const title = `${name}`;
    let char = '';
    if(!imageUrl){
      char = title.toUpperCase().charAt(0);
    }

    return(
      <div className='sitem' onTouchTap={this.toggleChecked}>
        <MAvatar className=''
          style={{marginRight: '15px', padding: '1px 0 0 0px'}}
          size={42} cha={char} src={imageUrl}/>

        <div className='slinfo'>
          {title}
          <span>{measurementUnit}</span>
        </div>

        <Checkbox onTouchTap={this.toggleChecked} checked={this.state.checked} className='schecker'/>
      </div>
    )
  }
}


export class ResourceRadioItem extends React.Component{
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
      name,
      measurementUnit,
      imageUrl,
      totalAmount,
      ...others
    } = this.props;

    const title = `${name}`;
    let char = '';
    if(!imageUrl){
      char = title.toUpperCase().charAt(0);
    }

    return(
      <div className='sitem' onTouchTap={this.handleRadioClick}>
        <RadioButton onTouchTap={this.handleRadioClick} checked={this.props.checked} className='schecker'/>

        <div className='slinfo'>
          {title}
          <span>{measurementUnit}</span>
        </div>

        <MAvatar className=''
          style={{marginRight: '15px', padding: '1px 0 0 0px'}}
          size={32} cha={char} src={imageUrl}/>

      </div>
    )
  }
}
