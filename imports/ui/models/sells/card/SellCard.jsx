import React from 'react'
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';

import SellShow from './SellShow';
import CustomerShow from '../../customers/show/CustomerShow';


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class SellCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showCard: false,
      showCustomer: false,
      isOpened: false}

    this.handleOnShowCustomer = this.handleOnShowCustomer.bind(this)
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

  handleOnShowCustomer(event){
    if(this.state.showCustomer){
      this.setState({showCustomer: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showCustomer: true, isOpened: true})
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
      reference,
      totalPrice,
      createdAt,
      status,
      paid,
      paidAt,
      customer,
      ...others
    } = this.props;

    const title = reference;

    let lastName = (customer && customer.lastName) ? customer.lastName : '';
    let char = customer ? customer.firstName.toUpperCase().charAt(0) : '';

    const createdS = new DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(createdAt);

    let paidS = ''
    if(paid){
        paidS = new DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(paidAt);
    }



    return(
      <MCard options={this.cardOptions()}>
        <div className='card-top' style={{border: 'none'}} onTouchTap={this.handleOnShow}>
          <CardTitle className='card-title' title={title} subtitle={createdS}/>
        </div>

        <div className='cresource-info ceboarder' style={{alignItems: 'center'}}>
          <div className='total' style={{fontSize: '30px'}}>
            ${totalPrice.toFixed(2)}
            <span></span>
          </div>
        </div>

        {customer ?
          <EnhancedButton style={{textAlign: 'left'}} onTouchTap={this.handleOnShowCustomer}>
            <div className='cyield-info-flex clickable-info'>
              <span>Customer</span>
              <MAvatar className='cyield-img'
                style={{marginRight: '15px', padding: '1px 0 0 0px'}}
                size={32} cha={char} src={customer.avatarURL}/>

              <div>
                {`${customer.firstName} ${lastName}`}
                <div className='div-span'>{customer.company}</div>
              </div>
            </div>
          </EnhancedButton>
        :
          <div className='cyield-info-flex'>
            <span>Customer</span>
            <span style={{fontSize: '14px', fontWeight: '300'}}>None</span>
          </div>
        }

        <div className='cyield-info sm' style={{textTransform: 'capitalize'}}>
          <span>Status</span>
          {status}
        </div>

        {paid ?
          <div className='cyield-info sm'>
            <span>Paid At</span>
            {paidS}
          </div>
          :
          <div className='cyield-info sm'>
            <span>Paid At</span>
            <span style={{fontSize: '14px', fontWeight: '300'}}>Not Paid</span>
          </div>
        }

        {/*<CardActions className='card-actions' style={{marginTop: '8px'}}>
        </CardActions>*/}

        <AutoLockScrolling lock={this.state.isOpened}/>

        {this.state.isOpened &&
          <SellShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShow}
            open={this.state.showCard}/>
        }

        {this.state.isOpened &&
          <CustomerShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShowCustomer}
            open={this.state.showCustomer}/>
        }
      </MCard>
    )
  }
}
