import React from 'react';
import MCard from '../../../structure/mcard/MCard';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';

import UnitShow from './UnitShow';

import classnames from 'classnames';
import {deepPurple500} from 'material-ui/styles/colors';
import TrackOn from 'material-ui/svg-icons/image/lens';
import TrackOff from 'material-ui/svg-icons/image/panorama-fish-eye';
import { browserHistory } from 'react-router'



export default class UnitCard extends React.Component{
  constructor(props){
    super(props)
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
    const {
      name,
      trackable,
      active,
      activeSub,
      parentUnit,
      showSubAction,
      onShowSubs,
      ...others
    } = this.props;

    const traClasses = classnames('unit-tr', {'on': trackable});
    let movementAction = null;
    let toggleB = null;
    let activeDiv = null;

    if(trackable){
      movementAction = <FlatButton className='action' label='Movements' secondary={true} onTouchTap={() => {browserHistory.push('/movements')} }/>;
      toggleB = <TrackOn/>;
    }else{
      toggleB = <TrackOff/>;
    }

    return(
      <MCard options={this.cardOptions()}>

        <div className='card-top' style={{display: 'block'}} onTouchTap={this.handleOnShow}>
          <CardTitle className='card-title' title={name}/>
          <div className={traClasses}>
            Trackable
            {toggleB}
          </div>
        </div>

        {trackable ?
          <div className='cyield-info' style={{color: deepPurple500}}>
            <span>Active</span>
            {active}
          </div>:
          <div className='cyield-info sm'>
            <span>Active Sub Units</span>
            {activeSub}
          </div>
        }

        <div className='cyield-info sm' style={{flexGrow: '1'}}>
          <span>Parent</span>
          {(parentUnit && parentUnit.name) ? parentUnit.name : 'Granja Granada'}
        </div>

        <CardActions className='card-actions'>
          {this.props.hasYields &&
            <FlatButton className='action' label='Yields' secondary={true} onTouchTap={() => {browserHistory.push('/yields')} }/>
          }
          <FlatButton className='action' label='Events' secondary={true}
            onTouchTap={() => {browserHistory.push('')} }/>
          <FlatButton className='action' label='Expenses' secondary={true} onTouchTap={() => {browserHistory.push('/expenses')} }/>
          {movementAction}

          {showSubAction && !trackable &&
            <IconButton
              className='sub-action'
              onTouchTap={onShowSubs} >
              {this.props.subActionButton}
            </IconButton>
          }

        </CardActions>

        <AutoLockScrolling lock={this.state.isOpened}/>

        {this.state.isOpened &&
          <UnitShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShow}
            open={this.state.showCard}/>
        }
      </MCard>
    )
  }
}
