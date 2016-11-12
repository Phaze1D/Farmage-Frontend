import React from 'react';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';
import ImageEdit from 'material-ui/svg-icons/image/edit';




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

        <div className='row'>
          <div className='col-xs-12'>

          </div>
        </div>

      </div>

    )
  }

}
