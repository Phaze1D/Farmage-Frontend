import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Divider from 'material-ui/Divider';



export default class Form extends React.Component{
  constructor(props){
    super(props);
    this.handleRemoveTouch = this.handleRemoveTouch.bind(this);
  }

  handleRemoveTouch(){
    this.props.onRemoveCall();
  }

  render(){
    const form = this.props.type ? <AddressForm {...this.props.info} handleRemoveTouch={this.handleRemoveTouch}/> : <TelephoneForm {...this.props.info} handleRemoveTouch={this.handleRemoveTouch}/>;
    return form;
  }
}

const AddressForm = (props) => {
  return(
    <div>
      <div className='row form-row address-form'>
        <div className='col-xs-4 sm-p-right'>
          <TextField
              name="address_name"
              type="text"
              defaultValue={props.name}
              className=""
              hintText="Name"
              fullWidth={true}/>
        </div>

        <div className='col-xs-8 sm-p-left sm-p-right address-inputs'>

          <div className='row'>
            <TextFieldColumn columClass='col-xs-12' name='street' type='text' defaultValue={props.street1} floatText='Address Line 1' />
          </div>

          <div className='row'>
            <TextFieldColumn columClass='col-xs-12' name='street2' type='text' defaultValue={props.street2} floatText='Address Line 2'/>
          </div>

          <div className='row'>
            <TextFieldColumn columClass='col-xs-6 sm-p-right' name='city' type='text' defaultValue={props.city} floatText='City'/>
            <TextFieldColumn columClass='col-xs-6 sm-p-left' name='state' type='text' defaultValue={props.state} floatText='State'/>
          </div>


          <div className='row'>
            <TextFieldColumn columClass='col-xs-6 sm-p-right' name='zip_code' type='text' defaultValue={props.zipCode} floatText='Zip Code'/>
            <TextFieldColumn columClass='col-xs-6 sm-p-left' name='country' type='text' defaultValue={props.country} floatText='Country'/>
          </div>

        </div>

        <IconButton onTouchTap={props.handleRemoveTouch} disableTouchRipple={true}>
          <ContentRemoveCircle />
        </IconButton>
      </div>

      <Divider/>
    </div>
  )
}


const TelephoneForm = (props) => {

  return(
    <div>
      <div className='row form-row low telephone-form'>
        <div className='col-xs-4 sm-p-right'>
          <TextField
              name="telephone_name"
              type="text"
              defaultValue={props.name}
              className=""
              hintText="Name"
              fullWidth={true}/>
        </div>

        <TextFieldColumn
          columClass='col-xs-8 sm-p-left sm-p-right'
          name='number'
          type='text'
          defaultValue={props.number}
          floatText='Number' />

        <IconButton onTouchTap={props.handleRemoveTouch} disableTouchRipple={true}>
          <ContentRemoveCircle />
        </IconButton>
      </div>
    </div>
  )
}

const TextFieldColumn = (props) => (
    <div className={props.columClass}>
      <TextField
          name={props.name}
          type={props.type}
          defaultValue={props.defaultValue}
          className=""
          floatingLabelText={props.floatText}
          fullWidth={true}/>
    </div>
)
