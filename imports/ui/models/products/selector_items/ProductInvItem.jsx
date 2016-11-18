import React from 'react';
import Avatar from 'material-ui/Avatar';




let ProductInvItem = (props) => (
  <div className='row'>
    <div className='col-xs-12'>
      <div className='selector-item'>
        <div className='select-title'>
          <Avatar backgroundColor={props.backgroundColor} style={{marginRight: '15px', padding: '1px 0 0 1px'}} size={56}>P</Avatar>

          <h3>
            Product Name
            <span>SKU - ADF-12-12 </span>
          </h3>
        </div>

        <div className='extra-info'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquisi ut alm id est laborum.
        </div>
      </div>
    </div>
  </div>
)

export default ProductInvItem;
