import React from 'react';
import MTextField from '../../../structure/textfield/MTextField';
import Avatar from 'material-ui/Avatar';



let ResourceProductItem = (props) => (
  <div className='row'>
    <div className='col-xs-12'>
      <div className='selector-item'>
        <div className='select-title'>
          <Avatar backgroundColor={props.backgroundColor} style={{marginRight: '15px', padding: '1px 0 0 1px'}} size={56}>F</Avatar>


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
            prefix=""
            prefixSide="right"/>
      </div>
    </div>
  </div>
)

export default ResourceProductItem;
