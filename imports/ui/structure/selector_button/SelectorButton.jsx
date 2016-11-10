import React from 'react';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import classnames from 'classnames';



const focusColor ={
  color: orangeA200,
  borderColor: orangeA200
};


export default class SelectorButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='contact-button highlight' onTouchTap={this.handleContactTouch}>
        <div className='title'>
          {this.props.title}
        </div>

        <IconButton onTouchTap={this.handleAddTouch}>
          <ContentAddCircle />
        </IconButton>
      </div>
    );
  }
}
