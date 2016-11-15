import React from 'react';


let ResourceYieldItem = (props) => (
  <div className='row'>
    <div className='col-xs-12'>
      <div className='selector-item'>
        <div className='select-title'>
          <div className='img-div' style={{backgroundImage: 'url(/default_item.jpg)'}}></div>

          <h3>
            Resource Name
            <span> Measument Unit - kg </span>
          </h3>
        </div>
      </div>
    </div>
  </div>
)

export default ResourceYieldItem;
