import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';
import { browserHistory } from 'react-router'


import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import classnames from 'classnames';



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class InventoryCard extends React.Component{
  constructor(props){
    super(props);
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

    const char = product.name.toUpperCase().charAt(0);

    return(
      <MCard>

        <div className='card-top' style={{marginBottom: '8px'}}>
          <CardTitle className='card-title' title={title} subtitle='Inventory Identifer'/>
        </div>

        <div className='cyield-info-flex'>
          <span>Product</span>
          <MAvatar className='cyield-img'
            style={{marginRight: '15px', padding: '1px 0 0 0px'}}
            size={32} cha={char} src={product.imageUrl}/>

          {product.name}
        </div>

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

        <div className='cyield-info sm'>
          <span>Expiration Date</span>
          {new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(expiresAt)}
        </div>


        <CardActions className='card-actions' style={{marginTop: '8px'}}>
          <FlatButton className='action' label='Movements' secondary={true}
            onTouchTap={() => {browserHistory.push('/dashboard/movements')} }/>
          <FlatButton className='action' label='Yields' secondary={true}
            onTouchTap={() => {browserHistory.push('/dashboard/yields')} }/>
          <FlatButton className='action' label='Sells' secondary={true}
            onTouchTap={() => {browserHistory.push('/dashboard/sells')} }/>
        </CardActions>

      </MCard>

    )
  }
}
