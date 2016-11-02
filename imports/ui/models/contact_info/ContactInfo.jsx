import React from 'react';
import TextField from 'material-ui/TextField';
import {indigo500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';


const focusColor ={
  color: indigo500,
  borderColor: indigo500
};

function TextFieldColumn(props){
  return(
    <div className={props.columClass}>
      <TextField
          name={props.name}
          type={props.type}
          className=""
          floatingLabelText={props.floatText}
          floatingLabelFocusStyle={focusColor}
          underlineFocusStyle={focusColor}
          fullWidth={true}/>
    </div>
  )
}

function AddressForm(props){
  return(
    <div className='row form-row address-form'>
      <div className='col-xs-4 sm-p-right'>
        <TextField
            name="address_name"
            type="text"
            className=""
            hintText="Name"
            underlineFocusStyle={focusColor}
            fullWidth={true}/>
      </div>

      <div className='col-xs-8 sm-p-left'>

        <div className='row'>
          <TextFieldColumn columClass='col-xs-12' name='street' type='text' floatText='Address Line 1' />
        </div>

        <div className='row'>
          <TextFieldColumn columClass='col-xs-12' name='street2' type='text' floatText='Address Line 2'/>
        </div>

        <div className='row'>
          <TextFieldColumn columClass='col-xs-6 sm-p-right' name='city' type='text' floatText='City'/>
          <TextFieldColumn columClass='col-xs-6 sm-p-left' name='state' type='text' floatText='State'/>
        </div>


        <div className='row'>
          <TextFieldColumn columClass='col-xs-6 sm-p-right' name='zip_code' type='text' floatText='Zip Code'/>
          <TextFieldColumn columClass='col-xs-6 sm-p-left' name='country' type='text' floatText='Country'/>
        </div>

      </div>

      <IconButton onTouchTap={this.handleIconTouch}>
        <ContentRemoveCircle />
      </IconButton>
    </div>
  )
}


function TelephoneForm(props){
  return(
    <div className='row form-row low telephone-form'>
      <div className='col-xs-4 sm-p-right'>
        <TextField
            name="address_name"
            type="text"
            className=""
            hintText="Name"
            underlineFocusStyle={focusColor}
            fullWidth={true}/>
      </div>

      <TextFieldColumn columClass='col-xs-8 sm-p-left' name='number' type='text' floatText='Number' />

      <IconButton onTouchTap={this.handleIconTouch}>
        <ContentRemoveCircle />
      </IconButton>

    </div>
  )
}


export default class ContactInfo extends React.Component{
  constructor(props){
    super(props);
    this.handleIconTouch = this.handleIconTouch.bind(this);
  }

  handleIconTouch(event){
    event.stopPropagation()
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
