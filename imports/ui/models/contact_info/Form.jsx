import React from 'react';
import TextField from 'material-ui/TextField';
import {deepOrangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Divider from 'material-ui/Divider';



const focusColor ={
  color: deepOrangeA200,
  borderColor: deepOrangeA200
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
    <div>
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

        <div className='col-xs-8 sm-p-left sm-p-right address-inputs'>

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

        <IconButton onTouchTap={props.handleRemoveTouch}>
          <ContentRemoveCircle />
        </IconButton>
      </div>

      <Divider/>
    </div>
  )
}

function TelephoneForm(props){
  return(
    <div>
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

        <TextFieldColumn columClass='col-xs-8 sm-p-left sm-p-right' name='number' type='text' floatText='Number' />

        <IconButton onTouchTap={props.handleRemoveTouch}>
          <ContentRemoveCircle />
        </IconButton>
      </div>
    </div>
  )
}

export default class Form extends React.Component{
  constructor(props){
    super(props);
    this.handleRemoveTouch = this.handleRemoveTouch.bind(this);
  }

  handleRemoveTouch(){
    this.props.onRemoveCall();
  }

  render(){
    const form = this.props.type ? <AddressForm handleRemoveTouch={this.handleRemoveTouch}/> : <TelephoneForm handleRemoveTouch={this.handleRemoveTouch}/>;
    return form;
  }
}
