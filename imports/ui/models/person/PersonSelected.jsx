import React from 'react';
import Avatar from 'material-ui/Avatar';




let PersonSelected = (props) => (
  <div className='row'>
    <div className='col-xs-12'>
      <div className='selector-item'>
        <div className='select-title'>
          <Avatar backgroundColor={props.backgroundColor} style={{marginRight: '15px', padding: '1px 0 0 1px'}} size={56}>R</Avatar>

          <h3>
            First Lastname
            <span>email@example.com</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
)

export default PersonSelected;
