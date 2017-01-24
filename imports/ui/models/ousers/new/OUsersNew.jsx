import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import MFade from '../../../structure/mfade/MFade';
import MainPanel from '../../../structure/main_panel/MainPanel';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import LToggler from '../../../structure/ltoggler/LToggler';

import {factoryOUser} from '../faker/factoryOUser';


export default class OUsersNew extends React.Component{
  constructor(props){
    super(props);

    this.handleOnClose = this.handleOnClose.bind(this);

    this.ouser = {}
    if(this.props.objectID) this.ouser = factoryOUser();
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

        <MFade>
          <FormFields
            ouser={this.ouser}
            permissions={this.ouser.permissions ? this.ouser.permissions : {}}
            isUpdate={this.props.isUpdate}/>
        </MFade>
        
      </MainPanel>
    )
  }
}


let FormFields = (props) => (
  <div className='form-fields'>

    <div className='row'>
      <div className='col-xs-12'>
        <TextField
            name="first_name"
            type="text"
            className="input-lg"
            hintText=""
            disabled={props.isUpdate}
            defaultValue={props.ouser.firstName}
            floatingLabelText="First Name"
            fullWidth={true}/>
      </div>
    </div>

    <div className='row'>
      <div className='col-xs-12'>
        <TextField
            name="last_name"
            type="text"
            hintText=""
            disabled={props.isUpdate}
            defaultValue={props.ouser.lastName}
            floatingLabelText="Last Name"
            fullWidth={true}/>
      </div>
    </div>

    <div className='row'>
      <div className='col-xs-12'>
        <TextField
            name="email"
            type="text"
            hintText=""
            disabled={props.isUpdate}
            defaultValue={props.ouser.email}
            floatingLabelText="Email"
            fullWidth={true}/>
      </div>
    </div>

    <div className='row title-row'>
      <div className='col-xs-12'>
        Permissions
      </div>
    </div>

    <LToggler
      title="Owner"
      subTitle="View and edit everything"
      defaultToggled={props.permissions.owner}/>

    <LToggler
      title="Viewer"
      subTitle="View everything"
      defaultToggled={props.permissions.viewer}/>

    <LToggler
      title="Expenses Manager"
      subTitle="View and edit expenses and providers"
      defaultToggled={props.permissions.expensesManager}/>

    <LToggler
      title="Sales Manager"
      subTitle="View and edit sells and clients"
      defaultToggled={props.permissions.sellsManager}/>

    <LToggler
      title="Units Manager"
      subTitle="View and edit units and yields"
      defaultToggled={props.permissions.unitsManager}/>

    <LToggler
      title="Batches Manager"
      subTitle="View and edit batches and products"
      defaultToggled={props.permissions.batchesManager}/>

    <LToggler
      title="Users Manager"
      subTitle="Invite and remove users"
      defaultToggled={props.permissions.usersManager}/>
  </div>
)
