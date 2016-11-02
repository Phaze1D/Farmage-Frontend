import React from 'react';
import TextField from 'material-ui/TextField';
import {indigo500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

const focusColor ={
  color: indigo500,
  borderColor: indigo500
};


export default class ContactInfo extends React.Component{
  constructor(props){
    super(props);
    this.handleIconTouch = this.handleIconTouch.bind(this);
  }

  handleIconTouch(event){
    event.stopPropagation()
  }

  textfieldColumn(cSize, name, type, floatText){
    return(
      <div className={'col-xs-'+cSize}>
        <TextField
            name={name}
            type={type}
            className=""
            floatingLabelText={floatText}
            floatingLabelFocusStyle={focusColor}
            underlineFocusStyle={focusColor}
            fullWidth={true}/>
      </div>
    )
  }

  addressForm(){
    return(
      <div className='row form-row address-form'>
        <div className='col-xs-4'>
          <TextField
              name="address_name"
              type="text"
              className=""
              hintText="Name"
              underlineFocusStyle={focusColor}
              fullWidth={true}/>
        </div>

        <div className='col-xs-8'>

          <div className='row'>
            {this.textfieldColumn('12', 'street', 'text', 'Address Line 1')}
          </div>

          <div className='row'>
            {this.textfieldColumn('12', 'street2', 'text', 'Address Line 2')}
          </div>

          <div className='row'>
            {this.textfieldColumn('6', 'city', 'text', 'City')}
            {this.textfieldColumn('6', 'state', 'text', 'State')}
          </div>


          <div className='row'>
            {this.textfieldColumn('6', 'zip_code', 'text', 'Zip Code')}
            {this.textfieldColumn('6', 'country', 'text', 'Country')}
          </div>

        </div>
      </div>
    )
  }

  telephoneForm(){
    return(
      <div className='row form-row low telephone-form'>
        <div className='col-xs-4'>
          <TextField
              name="address_name"
              type="text"
              className=""
              hintText="Name"
              underlineFocusStyle={focusColor}
              fullWidth={true}/>
        </div>

        {this.textfieldColumn('8', 'number', 'text', 'Number')}
        
      </div>
    )
  }

  render(){

    form = this.props.type ? this.addressForm() : this.telephoneForm();
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

        <div className='hidden-wrapper'>
          {form}
        </div>

      </div>
    )
  }
}


ContactInfo.PropTypes = {
  title:  React.PropTypes.string.isRequired,
  type: React.PropTypes.bool.isRequired
}
