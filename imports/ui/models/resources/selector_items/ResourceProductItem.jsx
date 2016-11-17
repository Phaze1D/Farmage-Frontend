import React from 'react';
import MTextField from '../../../structure/textfield/MTextField';



let ResourceProductItem = (props) => (
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

        <MTextField
            name="amount"
            type="number"
            className=""
            hintText=""
            floatingLabelText="Amount Pre Product"
            fullWidth={true}
            prefix="eggs"
            prefixSide="right"/>
      </div>
    </div>
  </div>
)

export default ResourceProductItem;
