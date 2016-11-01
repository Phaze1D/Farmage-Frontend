import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';



export default class ContactInfo extends React.Component{
  constructor(props){
    super(props);
    this.handleIconTouch = this.handleIconTouch.bind(this);
  }

  handleIconTouch(event){
    event.stopPropagation()

  }

  render(){
    return(
      <div className='contact-button'>
        <div>
          {this.props.title}
        </div>

        <IconButton onTouchTap={this.handleIconTouch}>
          <ContentAddCircle />
        </IconButton>
      </div>
    )
  }
}


ContactInfo.PropTypes = {
  title:  React.PropTypes.string.isRequired
}
