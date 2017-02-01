import React from 'react';
import TrackOn from 'material-ui/svg-icons/image/lens';
import TrackOff from 'material-ui/svg-icons/image/panorama-fish-eye';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MAvatar from '../../../structure/mavatar/MAvatar';
import {deepPurple500, grey700} from 'material-ui/styles/colors';
import classnames from 'classnames'

export class UnitCheckBoxItem extends React.Component{
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
      trackable,
      active,
      activeSub,
      parentUnit,
      onShowSubs,
      description,
      ...others
    } = this.props;

    const traClasses = classnames('slhigh', {'on': trackable})
    const toggleB = trackable ? <TrackOn/> : <TrackOff/>;

    return(
      <div className='sitem' onTouchTap={this.toggleChecked}>
        <Checkbox onTouchTap={this.toggleChecked} checked={this.state.checked} className='schecker'/>

        <div className='slinfo'>
          {name}
          {trackable ?
            <span style={{color: grey700}}>Active - {active}</span>
              :
            <span style={{fontSize: '12px'}}>Active Sub Sectors - {activeSub}</span>
          }
        </div>

        <div className={traClasses}>Trackable {toggleB}</div>

      </div>
    )
  }
}


export class UnitRadioItem extends React.Component{
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
      trackable,
      active,
      activeSub,
      parentUnit,
      onShowSubs,
      description,
      ...others
    } = this.props;

    const traClasses = classnames('slhigh', {'on': trackable})
    const toggleB = trackable ? <TrackOn/> : <TrackOff/>;

    return(
      <div className='sitem' onTouchTap={this.handleRadioClick}>
        <RadioButton onTouchTap={this.handleRadioClick} checked={this.props.checked} className='schecker'/>

        <div className='slinfo'>
          {name}
          {trackable ?
            <span style={{color: grey700}}>Active - {active}</span>
              :
            <span style={{fontSize: '12px'}}>Active Sub Sectors - {activeSub}</span>
          }
        </div>

        <div className={traClasses}>Trackable {toggleB}</div>

      </div>
    )
  }
}
