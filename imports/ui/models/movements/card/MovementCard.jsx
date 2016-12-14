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
import classnames from 'classnames';



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class MovementCard extends React.Component{
  constructor(props){
    super(props);
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

    const traClasses = classnames('unit-tr', {'on': manuel});
    let manuelB = manuel ? <ManuelOn/> : <ManuelOff/> ;


    return(
      <MCard>

        <div className='card-top' style={{display: 'block'}}>
          <CardTitle className='card-title' title={forType + ' Movement'} subtitle='' style={{textTransform: 'capitalize'}}/>
          <div className={traClasses}>
            Manual
            {manuelB}
          </div>
        </div>

        <EnhancedButton style={{textAlign: 'left'}}>
          <div className='cyield-info-flex clickable-info'>
            <span>Created By</span>
            <MAvatar className='cyield-img'
              style={{marginRight: '15px', padding: '1px 0 0 0px'}}
              size={32} cha={char} src={user.avatarURL}/>

            {userTitle}
          </div>
        </EnhancedButton>

        <div className='cyield-info'>
          <span>Amount</span>
          {amount}
        </div>

        <EnhancedButton style={{textAlign: 'left'}}>
          <div className='cyield-info sm clickable-info'>
            <span>{forType} Identifier</span>
            {forId}
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

      </MCard>

    )
  }
}
