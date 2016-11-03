import React from 'react';
import TextField from 'material-ui/TextField';
import {indigo500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
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

export default class TelephoneForm extends React.Component{
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

          <IconButton onTouchTap={this.handleRemoveTouch}>
            <ContentRemoveCircle />
          </IconButton>
        </div>
      </div>
    )
  }
}
