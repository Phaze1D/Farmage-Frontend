import React from 'react';
import TextField from 'material-ui/TextField';
import {indigo500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import AddressForm from './AddressForm';
import TelephoneForm from './TelephoneForm';


export default class ContactInfo extends React.Component{
  constructor(props){
    super(props);
    this.handleAddTouch = this.handleAddTouch.bind(this);
  }

  handleAddTouch(event){

  }

  render(){

    form = this.props.type ? <AddressForm/> : <TelephoneForm/>
    return(
      <div>
        <div className='contact-button'>
          <div>
            {this.props.title}
          </div>

          <IconButton onTouchTap={this.handleIconTouch}>
            <ContentAddCircle />
          </IconButton>
        </div>

        {form}

      </div>
    )
  }
}


ContactInfo.PropTypes = {
  title:  React.PropTypes.string.isRequired,
  type: React.PropTypes.bool.isRequired
}
