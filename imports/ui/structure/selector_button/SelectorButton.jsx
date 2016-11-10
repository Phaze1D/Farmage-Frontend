import React from 'react';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import classnames from 'classnames';



const focusColor ={
  color: orangeA200,
  borderColor: orangeA200
};


export default class SelectorButton extends React.Component{
  constructor(props){
    super(props);
  }

  showError(message){
    if(message){
      return(
        <div className="error-div">
          <hr></hr>
          <div>
            This is and Error
          </div>
        </div>
      )
    }

    return null;
  }

  render(){
    return(
      <div className='selector-button' onTouchTap={this.handleContactTouch}>
        <div className='title'>
          {this.props.title}
        </div>

        <IconButton onTouchTap={this.handleAddTouch}>
          <ImageEdit />
        </IconButton>

        {this.showError(null)}

      </div>
    );
  }
}
