import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ContentEdit from 'material-ui/svg-icons/image/edit';



export default class Addresses extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <FlatButton
      className="contact-button"
      label={this.props.title}
      labelPosition="before"
      primary={true}
      icon={<ContentEdit />}
    />
    )
  }
}


Addresses.PropTypes = {
  title:  React.PropTypes.string.isRequired
}
