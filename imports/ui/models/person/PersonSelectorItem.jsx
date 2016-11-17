import React from 'react';
import Avatar from 'material-ui/Avatar';




let PersonSelectorItem = (props) => (
  <div className='row'>
    <div className='col-xs-12'>
      <div className='selector-item'>
        <div className='select-title'>
          <Avatar style={{marginRight: '15px', padding: '2px 0 0 2px'}} size={56}>F</Avatar>

          <h3>
            First Lastname
            <span>email@example.com</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
)

export default PersonSelectorItem;
