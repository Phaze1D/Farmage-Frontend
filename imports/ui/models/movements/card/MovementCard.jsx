import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import { browserHistory } from 'react-router'
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import ManuelOn from 'material-ui/svg-icons/image/lens';
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import ManuelOff from 'material-ui/svg-icons/image/panorama-fish-eye';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import classnames from 'classnames';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';

import MovementShow from './MovementShow';
import UnitShow from '../../units/card/UnitShow';
import YieldShow from '../../yields/card/YieldShow';
import BatchShow from '../../batches/card/BatchShow';
import OUserShow from '../../ousers/card/OUserShow';


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class MovementCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showCard: false,
      showUnit: false,
      showYield: false,
      showBatch: false,
      showOUser: false,
      isOpened: false
    }

    this.handleOnShow = this.handleOnShow.bind(this);
    this.handleOnShowUnit = this.handleOnShowUnit.bind(this);
    this.handleOnShowYield = this.handleOnShowYield.bind(this);
    this.handleOnShowBatch = this.handleOnShowBatch.bind(this);
    this.handleOnShowOUser = this.handleOnShowOUser.bind(this);
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

  handleOnShowUnit(event){
    if(this.state.showUnit){
      this.setState({showUnit: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showUnit: true, isOpened: true})
    }
  }

  handleOnShowYield(event){
    if(this.state.showYield){
      this.setState({showYield: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showYield: true, isOpened: true})
    }
  }

  handleOnShowBatch(event){
    if(this.state.showBatch){
      this.setState({showBatch: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showBatch: true, isOpened: true})
    }
  }

  handleOnShowOUser(event){
    if(this.state.showOUser){
      this.setState({showOUser: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showOUser: true, isOpened: true})
    }
  }

  handleUpdate(){
    this.props.onRequestUpdate(this.props._id)
  }

  cardOptions(){
    return [
      <MenuItem key='edit' primaryText="Edit" leftIcon={<ImageEdit />} onTouchTap={this.handleUpdate}/>
    ]
  }

  render(){
    const {
      _id,
      amount,
      forType,
      forId,
      createdAt,
      manuel,
      user,
      ...others
    } = this.props;

    let userTitle = user.firstName;
    if(user.lastName){
      userTitle += (" " + user.lastName);
    }

    let char = userTitle.charAt(0);

    let forMethod = null;
    if(forType === 'yield') forMethod = this.handleOnShowYield;
    if(forType === 'unit') forMethod = this.handleOnShowUnit;
    if(forType === 'batch') forMethod = this.handleOnShowBatch;

    const traClasses = classnames('unit-tr', {'on': manuel});
    let manuelB = manuel ? <ManuelOn/> : <ManuelOff/> ;


    return(
      <MCard ref='mcard' options={this.cardOptions()}>

        <div className='card-top' style={{display: 'block'}} onTouchTap={this.handleOnShow}>
          <CardTitle className='card-title' title={forType + ' Movement'} subtitle='' style={{textTransform: 'capitalize'}}/>
          <div className={traClasses}>
            Manual
            {manuelB}
          </div>
        </div>

        <EnhancedButton style={{textAlign: 'left'}} onTouchTap={this.handleOnShowOUser}>
          <div className='cyield-info-flex clickable-info'>
            <span>Created By</span>
            <MAvatar className='cyield-img'
              style={{marginRight: '15px', padding: '1px 0 0 0px'}}
              size={32} cha={char} src={user.avatarURL}/>

            {userTitle}
          </div>
        </EnhancedButton>

        <EnhancedButton style={{textAlign: 'left'}} onTouchTap={forMethod}>
          <div className='cyield-info sm clickable-info'>
            <span>For {forType}</span>
            {forId}
          </div>
        </EnhancedButton>

        <div className='cyield-info'>
          <span>Changed By</span>
          {amount}
        </div>

        <div className='cyield-info sm'>
          <span>Created Date</span>
          {new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(createdAt)}
        </div>

        <AutoLockScrolling lock={this.state.isOpened}/>

        {this.state.isOpened &&
          <MovementShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShow}
            open={this.state.showCard}/>
        }

        {this.state.isOpened &&
          <UnitShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShowUnit}
            open={this.state.showUnit}/>
        }

        {this.state.isOpened &&
          <YieldShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShowYield}
            open={this.state.showYield}/>
        }

        {this.state.isOpened &&
          <BatchShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShowBatch}
            open={this.state.showBatch}/>
        }

        {this.state.isOpened &&
          <OUserShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShowOUser}
            open={this.state.showOUser}/>
        }

      </MCard>

    )
  }
}
