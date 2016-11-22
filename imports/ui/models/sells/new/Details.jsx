import React from 'react';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';
// import Barcode from '../../../structure/msvg/Barcode'
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ProductSellItem from '../../products/selector_items/ProductSellItem';
import randomImageColor from '../../../structure/app/RandomColor.js';






export default class Details extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <div className='details-header'>
          <div className='title'>
            Products
          </div>

          <IconButton onTouchTap={this.handleAddTouch}>
            <ImageCameraAlt className='camera-alt'/>
          </IconButton>

          <IconButton onTouchTap={this.handleAddTouch}>
            <ImageEdit className='edit'/>
          </IconButton>
        </div>


        <ProductSellItem backgroundColor={randomImageColor()}/>
        <ProductSellItem backgroundColor={randomImageColor()}/>
        <ProductSellItem backgroundColor={randomImageColor()}/>
        <ProductSellItem backgroundColor={randomImageColor()}/>
        <ProductSellItem backgroundColor={randomImageColor()}/>
        <ProductSellItem backgroundColor={randomImageColor()}/>
        


      </div>

    )
  }

}
