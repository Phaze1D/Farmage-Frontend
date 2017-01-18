import React from 'react';
import {Random} from 'meteor/random'
import MAvatar from '../../structure/mavatar/MAvatar';

let DateTimeFormat = global.Intl.DateTimeFormat;

let UserShowInfo = (props) => {
  let avatarURL = props.user.avatarURL;
  let char = props.user.firstName.toUpperCase().charAt(0)
  return(
    <div className='mtab-content-card flex'>
      <div className='mtab-info' style={{marginBottom: '0'}}>
        <span>{`${props.subTitle} By`}</span>

        <div className='flex'>
          <MAvatar className='card-avatar'
            style={{marginRight: '15px', padding: '1px 0 0 1px'}}
            size={56} cha={char} src={avatarURL}/>

          <div style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
            {props.user.firstName} {props.user.lastName}
            <span>{props.user.email}</span>
          </div>

        </div>
      </div>

        <div className='mtab-info right-align' >
          <span>{`${props.subTitle} Date`}</span>
            {new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(props.date)}
        </div>
    </div>
  )
}

export default UserShowInfo
