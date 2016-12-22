import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import { browserHistory } from 'react-router'
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
      <MCard>

        <div className='card-top' style={{marginBottom: '8px'}}>
          <CardTitle className='card-title' title={title} subtitle='Yield Identifer'/>
        </div>

        <EnhancedButton style={{textAlign: 'left'}}>

          <div className='cyield-info-flex clickable-info'>
            <span>Resource</span>
            <MAvatar className='cyield-img'
              style={{marginRight: '15px', padding: '1px 0 0 0px'}}
              size={32} cha={char} src={resource.imageUrl}/>

            {resource.name}
          </div>

        </EnhancedButton>

        <div className='cyield-info'>
          <span>Amount</span>
          {amount}
          <div className='dspn'>
            {resource.measurementUnit}
          </div>
        </div>

        <EnhancedButton style={{textAlign: 'left'}}>
          <div className='cyield-info sm clickable-info'>
            <span>From Unit</span>
            {unit.name}
          </div>
        </EnhancedButton>


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
          <FlatButton className='action' label='Inventories' secondary={true}
            onTouchTap={() => {browserHistory.push('/inventories')} }/>
        </CardActions>

      </MCard>

    )
  }
}
