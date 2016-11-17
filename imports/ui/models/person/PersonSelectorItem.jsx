import React from 'react';



let PersonSelectorItem = (props) => (
  <div className='row'>
    <div className='col-xs-12'>
      <div className='selector-item'>
        <div className='select-title'>
          <div className='img-div' style={{backgroundImage: 'url(/default_avatar.jpg)'}}></div>

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
