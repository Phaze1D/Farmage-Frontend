import React from 'react';
import MAvatar from '../../../structure/mavatar/MAvatar';




let ResourceYieldItem = (props) => {
  const char = props.resource.name.toUpperCase().charAt(0);
  return (
    <div className='row'>
      <div className='col-xs-12'>
        <div className='selector-item'>
          <div className='select-title'>
            <MAvatar className='card-avatar'
              style={{marginRight: '15px', padding: '1px 0 0 1px'}}
              size={56} cha={char} src={props.resource.imageUrl}/>


            <h3>
              {props.resource.name}
              <span> Measurement Unit - {props.resource.measurementUnit} </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )

}


export default ResourceYieldItem;
