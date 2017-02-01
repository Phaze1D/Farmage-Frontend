import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import { browserHistory } from 'react-router'
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import classnames from 'classnames';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';

import YieldShow from './YieldShow';
import ResourceShow from '../../resources/card/ResourceShow'
import UnitShow from '../../units/card/UnitShow'



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showCard: false,
      showResource: false,
      showUnit: false,
      isOpened: false
    }

    this.handleOnShow = this.handleOnShow.bind(this);
    this.handleOnShowUnit = this.handleOnShowUnit.bind(this);
    this.handleOnShowResource = this.handleOnShowResource.bind(this);
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

  handleOnShowResource(event){
    if(this.state.showResource){
      this.setState({showResource: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showResource: true, isOpened: true})
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
      _id,
      identifer,
      amount,
      createdAt,
      expiresAt,
      resource,
      unit,
      ...others
    } = this.props;


    let title = identifer && identifer.length > 0 ? identifer : _id;
    const char = resource.name.toUpperCase().charAt(0);

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
      <MCard options={this.cardOptions()}>

        <div className='card-top' style={{marginBottom: '8px'}} onTouchTap={this.handleOnShow}>
          <CardTitle className='card-title' title={title} subtitle='Yield Identifer'/>
        </div>

        <EnhancedButton style={{textAlign: 'left'}} onTouchTap={this.handleOnShowResource}>

          <div className='cyield-info-flex clickable-info'>
            <span>Resource</span>
            <MAvatar className='cyield-img'
              style={{marginRight: '15px', padding: '1px 0 0 0px'}}
              size={32} cha={char} src={resource.imageUrl}/>

            {resource.name}
          </div>

        </EnhancedButton>

        <EnhancedButton style={{textAlign: 'left'}} onTouchTap={this.handleOnShowUnit}>
          <div className='cyield-info sm clickable-info'>
            <span>From Sector</span>
            {unit.name}
          </div>
        </EnhancedButton>

        <div className='cyield-info'>
          <span>Amount</span>
          {amount}
          <div className='dspn'>
            {resource.measurementUnit}
          </div>
        </div>




        <div className='cyield-info sm'>
          <span>Created Date</span>
          {new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(createdAt)}
        </div>

        <div className='cyield-info sm'>
          <span>Expiration Date</span>
          {expireDateString}
        </div>


        <CardActions className='card-actions' style={{marginTop: '8px'}}>
          <FlatButton className='action' label='Movements' secondary={true}
            onTouchTap={() => {browserHistory.push('/movements')} }/>
          <FlatButton className='action' label='Batches' secondary={true}
            onTouchTap={() => {browserHistory.push('/batches')} }/>
        </CardActions>

        <AutoLockScrolling lock={this.state.isOpened}/>

        {this.state.isOpened &&
          <YieldShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShow}
            open={this.state.showCard}/>
        }

        {this.state.isOpened &&
          <ResourceShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShowResource}
            open={this.state.showResource}/>
        }

        {this.state.isOpened &&
          <UnitShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShowUnit}
            open={this.state.showUnit}/>
        }

      </MCard>

    )
  }
}
