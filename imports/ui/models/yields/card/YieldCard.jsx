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

        <div className='card-top'>
          <CardTitle className='card-title' title={title} subtitle='Yield Identifer'/>
        </div>

        <div className='cyield-info-flex'>
          <span>Resource</span>
          <MAvatar className='cyield-img'
            style={{marginRight: '15px', padding: '1px 0 0 0px'}}
            size={32} cha={char} src={resource.imageUrl}/>

          {resource.name}
        </div>

        <div className='cyield-info'>
          <span>Created Date</span>
          {new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(createdAt)}
        </div>

        <div className='cyield-info'>
          <span>Expiration Date</span>
          {new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(expiresAt)}
        </div>

        <div className='cyield-info'>
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
