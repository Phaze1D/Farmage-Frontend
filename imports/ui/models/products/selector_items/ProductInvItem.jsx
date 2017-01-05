import React from 'react';
import MAvatar from '../../../structure/mavatar/MAvatar';




let ProductInvItem = (props) => {
  const char = props.product.name.toUpperCase().charAt(0);
  return (
    <div className='row'>
      <div className='col-xs-12'>
        <div className='selector-item'>
          <div className='select-title'>
            <MAvatar className='card-avatar'
              style={{marginRight: '15px', padding: '1px 0 0 1px'}}
              size={56} cha={char} src={props.product.imageUrl}/>

            <h3>
              {props.product.name}
              <span>{props.product.sku}</span>
            </h3>
          </div>

          {props.product.description &&
            <div className='extra-info'>
              {props.product.description}
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default ProductInvItem;
