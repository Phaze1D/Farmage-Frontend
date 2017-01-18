import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import Edit from 'material-ui/svg-icons/image/edit';
import { browserHistory } from 'react-router'
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';

import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import BatchShow from './BatchShow';
import ProductShow from '../../products/card/ProductShow';

import classnames from 'classnames';



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class BatchCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {showCard: false, showProduct: false, isOpened: false}

    this.handleOnShowProduct = this.handleOnShowProduct.bind(this)
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

  handleOnShowProduct(event){
    if(this.state.showProduct){
      this.setState({showProduct: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showProduct: true, isOpened: true})
    }
  }

  handleUpdate(){
    this.props.onRequestUpdate(this.props._id)
  }

  cardOptions(){
    return [
      <MenuItem key='expand' primaryText="Expand" leftIcon={<FullScreen />} />,
      <MenuItem key='edit' primaryText="Edit" leftIcon={<Edit />} onTouchTap={this.handleUpdate}/>,
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
      product,
      ...others
    } = this.props;


    let title = '';
    if(identifer && identifer.length > 0){
      title = identifer;
    }else{
      title = _id;
    }

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

    const char = product.name.toUpperCase().charAt(0);

    return(
      <MCard options={this.cardOptions()}>

        <div className='card-top' style={{marginBottom: '8px'}} onTouchTap={this.handleOnShow}>
          <CardTitle className='card-title' title={title} subtitle='Batch Identifer'/>
        </div>

        <EnhancedButton style={{textAlign: 'left'}} onTouchTap={this.handleOnShowProduct}>
          <div className='cyield-info-flex clickable-info'>
            <span>Product</span>
            <MAvatar className='cyield-img'
              style={{marginRight: '15px', padding: '1px 0 0 0px'}}
              size={32} cha={char} src={product.imageUrl}/>

            {product.name}
          </div>
        </EnhancedButton>

        <div className='cyield-info'>
          <span>
            Amount
          </span>
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

        <div className='cyield-info sm' style={{flexGrow: '1'}}>
          <span>Expiration Date</span>
          {expireDateString}
        </div>


        <CardActions className='card-actions' style={{marginTop: '8px'}}>
          <FlatButton className='action' label='Movements' secondary={true}
            onTouchTap={() => {browserHistory.push('/movements')} }/>
          {/*<FlatButton className='action' label='Yields' secondary={true}
            onTouchTap={() => {browserHistory.push('/yields')} }/>*/}
          <FlatButton className='action' label='Events' secondary={true}
            onTouchTap={() => {browserHistory.push('')} }/>
          <FlatButton className='action' label='Sales' secondary={true}
            onTouchTap={() => {browserHistory.push('/sells')} }/>
        </CardActions>


        <AutoLockScrolling lock={this.state.isOpened}/>

        {this.state.isOpened &&
          <BatchShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShow}
            open={this.state.showCard}/>
        }

        {this.state.isOpened &&
          <ProductShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShowProduct}
            open={this.state.showProduct}/>
        }

      </MCard>

    )
  }
}
