import React from 'react';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import classnames from 'classnames';
import Avatar from 'material-ui/Avatar';

import {randomImageColor} from '../app/RandomColor.js';




export default class SelectorButton extends React.Component{
  constructor(props){
    super(props);
    this.randomColor = randomImageColor();

    this.handleTitleTouch = this.handleTitleTouch.bind(this);
    this.handleIconTouch = this.handleIconTouch.bind(this);
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

  handleTitleTouch(event){
    event.stopPropagation();
    this.props.toggleSelector(event);
  }

  handleIconTouch(event){
    event.stopPropagation();
    this.props.toggleSelector(event);
  }



  render(){
    sClasses = classnames('selector-button', {'highlight': this.props.highlight})
    tClasses = classnames('title', {'with-img': this.props.showImage})


    return(
      <div className={sClasses} onTouchTap={this.handleTitleTouch}>
        {this.props.showImage &&
          <Avatar backgroundColor={this.randomColor} style={{marginRight: '15px', padding: '1px 0 0 0px', fontSize: '16px'}} size={35}>R</Avatar>
        }

        <div className={tClasses}>
          {this.props.title}
        </div>

        <IconButton onTouchTap={this.handleIconTouch}>
          <ImageEdit />
        </IconButton>

        {this.showError(null)}

      </div>
    );
  }
}
