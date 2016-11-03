import React from 'react';
import TextField from 'material-ui/TextField';
import {indigo500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Divider from 'material-ui/Divider';



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

export default class AddressForm extends React.Component{
  constructor(props){
    super(props);
    this.handleRemoveTouch = this.handleRemoveTouch.bind(this);
  }

  handleRemoveTouch(){
    this.props.onRemoveCall();
  }

  render(){
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

          <div className='col-xs-8 sm-p-left address-inputs'>

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

          <IconButton onTouchTap={this.handleRemoveTouch}>
            <ContentRemoveCircle />
          </IconButton>
        </div>

        <Divider/>
      </div>
    )
  }
}
