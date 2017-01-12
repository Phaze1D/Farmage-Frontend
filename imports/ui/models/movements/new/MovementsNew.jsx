import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';
import TextArea from '../../../structure/textarea/TextArea';

import MainPanel from '../../../structure/main_panel/MainPanel';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import LToggler from '../../../structure/ltoggler/LToggler';

import {factoryMovement} from '../faker/factoryMovement';


export default class MovementsNew extends React.Component{
  constructor(props){
    super(props);

    this.handleOnClose = this.handleOnClose.bind(this);

    this.movement = {}
    if(this.props.objectID) this.movement = factoryMovement();
  }

  handleOnClose(event){
    this.props.onCloseRight(false);
  }


  render(){

    return(
      <MainPanel
        classes='container-fluid'
        panelID='right-drawer'
        toolbar={
          <FormActionBar onClear={this.handleOnClose} title={this.props.headerTitle}/>
        }>

        <FormFields
          movement={this.movement}
          isUpdate={this.props.isUpdate}/>

      </MainPanel>
    )
  }
}


let FormFields = (props) => (
  <div className='form-fields'>

    <div className='row'>
      <div className='col-xs-4 sm-p-right'>
        <TextField
            name="amount"
            type="number"
            defaultValue={props.movement.amount}
            className=""
            hintText=""
            disabled={true}
            floatingLabelText="Changed By"
            fullWidth={true}/>
      </div>

      <div className='col-xs-4 sm-p-left sm-p-right'>
        <TextField
            name="for_type"
            type="text"
            defaultValue={props.movement.forType.charAt(0).toUpperCase() + props.movement.forType.slice(1)}
            className=""
            hintText=""
            disabled={true}
            floatingLabelText="For"
            fullWidth={true}/>
      </div>

      <div className='col-xs-4 sm-p-left'>
        <TextField
            name="for_id"
            type="text"
            defaultValue={props.movement.forId}
            className=""
            hintText=""
            disabled={true}
            floatingLabelText="For Identifier"
            fullWidth={true}/>
      </div>
    </div>

    <div className='row'>
      <div className='col-xs-12'>
        <TextArea
          name="notes"
          type="text"
          defaultValue={props.movement.notes}
          className=""
          floatingLabelText="Description"
          fullWidth={true}
          multiLine={true}
          showCount={true}
          maxCount={512}
          rows={1} />
      </div>
    </div>

    <LToggler
      title="Is Manuel"
      subTitle="Manuel movements are those that are not created by the app"
      defaultToggled={props.movement.manuel}
      disabled={true}/>

  </div>
)
