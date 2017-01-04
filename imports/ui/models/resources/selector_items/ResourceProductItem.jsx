import React from 'react';
import MTextField from '../../../structure/textfield/MTextField';
import MAvatar from '../../../structure/mavatar/MAvatar';
import {randomImageColor, alphaImageColor} from '../../../structure/app/RandomColor.js';


let ResourceProductItem = (props) => {
  const char = props.resource.name.toUpperCase().charAt(0);
  return (
    <div className='row'>
      <div className='col-xs-12'>
        <div className='selector-item'>
          <div className='select-title'>
            <MAvatar className='card-avatar'
              style={{marginRight: '15px', padding: '1px 0 0 1px'}}
              size={56} cha={char} src={props.resource.resource.imageUrl}/>

            <h3>
              {props.resource.name}
              <span> Measurement Unit - {props.resource.measurementUnit} </span>
            </h3>
          </div>

          <MTextField
              name="amount"
              type="number"
              defaultValue={props.resource.amountPre}
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
}

export default ResourceProductItem;
