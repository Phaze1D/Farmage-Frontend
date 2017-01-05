import React from 'react';
import MAvatar from '../../structure/mavatar/MAvatar';




let PersonSelected = (props) => {
  const char = props.person.firstName.toUpperCase().charAt(0);
  return (
    <div className='row'>
      <div className='col-xs-12'>
        <div className='selector-item'>
          <div className='select-title'>
            <MAvatar className='card-avatar'
              style={{marginRight: '15px', padding: '1px 0 0 1px'}}
              size={56} cha={char} src={props.person.avatarURL}/>

            <h3>
              {props.person.firstName} {props.person.lastName}
              <span>{props.person.company}</span>
              <span>{props.person.email}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonSelected;
