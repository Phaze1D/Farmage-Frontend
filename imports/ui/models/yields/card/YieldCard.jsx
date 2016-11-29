import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';

import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import classnames from 'classnames';



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldCard extends React.Component{
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
      resource,
      ...others
    } = this.props;


    let title = '';
    if(identifer && identifer.length > 0){
      title = identifer;
    }else{
      title = _id;
    }

    const char = resource.name.toUpperCase().charAt(0);

    return(
      <MCard>

        <div className='card-top resource-top'>
          <MAvatar className='card-avatar'
            style={{marginRight: '15px', padding: '0px 0 0 0px'}}
            size={28} cha={char} src={resource.imageUrl}/>
          <CardTitle className='card-title-sm' title={resource.name} subtitle=''/>
        </div>

        <div className='cyield-info sm'>
          <span>Identifer</span>
          {title}
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

        <div className='cyield-info lg'>
          <span>Amount</span>
          {amount}
          <div className='dspn'>
            {resource.measurementUnit}
          </div>
        </div>


        <CardActions className='card-actions'>
          <FlatButton className='action' label='Movements' />
          <FlatButton className='action' label='Inventories' />
        </CardActions>

      </MCard>

    )
  }
}
