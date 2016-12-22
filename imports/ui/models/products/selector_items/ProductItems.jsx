import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MAvatar from '../../../structure/mavatar/MAvatar';

export class ProductCheckBoxItem extends React.Component{
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
      sku,
      imageUrl,
      ...others
    } = this.props;

    const title = `${name}`;
    const char = title.toUpperCase().charAt(0);

    return(
      <div className='sitem' onTouchTap={this.toggleChecked}>
        <Checkbox onTouchTap={this.toggleChecked} checked={this.state.checked} className='schecker'/>

        <div className='slinfo'>
          {title}
          <span>{sku}</span>
        </div>

        <MAvatar className=''
          style={{marginRight: '15px', padding: '1px 0 0 0px'}}
          size={38} cha={char} src={imageUrl}/>

      </div>
    )
  }
}


export class ProductRadioItem extends React.Component{
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
      sku,
      imageUrl,
      ...others
    } = this.props;

    const title = `${name}`;
    const char = title.toUpperCase().charAt(0);


    return(
      <div className='sitem' onTouchTap={this.handleRadioClick}>
        <RadioButton onTouchTap={this.handleRadioClick} checked={this.props.checked} className='schecker'/>

        <div className='slinfo'>
          {title}
          <span>{sku}</span>
        </div>

        <MAvatar className=''
          style={{marginRight: '15px', padding: '1px 0 0 0px'}}
          size={38} cha={char} src={imageUrl}/>

      </div>
    )
  }
}
