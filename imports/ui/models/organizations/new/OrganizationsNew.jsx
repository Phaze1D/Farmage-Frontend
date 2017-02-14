import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import MainPanel from '../../../structure/main_panel/MainPanel';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import ContactInfo from '../../contact_info/ContactInfo';
import MFade from '../../../structure/mfade/MFade';

import {factoryOrganization} from '../faker/factoryOrganization'





export default class OrganizationsNew extends React.Component{
  constructor(props){
    super(props);
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  handleOnClose(event){
    this.props.onCloseRight(false);
  }

  render(){

    let organization = {}
    let avatarBStyle = {}
    if(this.props.objectID){
      organization = factoryOrganization();

      if(organization.avatarURL){
        avatarBStyle = {
          background: `url(${organization.avatarURL})`
        }
      }
    }


    return(
      <MainPanel
        classes='container-fluid'
        panelID='right-drawer'
        toolbar={
          <FormActionBar onClear={this.handleOnClose} title={this.props.headerTitle}/>
        }>


        <MFade>
          <FormFields
            avatarBStyle={avatarBStyle}
            isUpdate={this.props.isUpdate}
            organization={organization}/>
        </MFade>


      </MainPanel>
    )
  }
}


let FormFields = (props) => (
  <div className='form-fields'>
    <div className='row'>

      <div className='col-xs-12 col-flex'>
        <IconButton className='avatar-button' style={props.avatarBStyle}>
          <ImageCameraAlt />
        </IconButton>


        <TextField
            name="name"
            type="text"
            className="input-lg"
            hintText=""
            defaultValue={props.organization.name}
            floatingLabelText="Organization Name"
            fullWidth={true}/>
      </div>
    </div>

    <div className='row'>
      <div className='col-xs-12'>
        <TextField
            name="email"
            type="text"
            className=""
            hintText=""
            defaultValue={props.organization.email}
            floatingLabelText="Email"
            fullWidth={true}/>
      </div>
    </div>

    <div className='row'>
      <div className='col-xs-12'>
        <ContactInfo title="Telephones" type={false} forms={props.organization.telephones}/>
      </div>
    </div>

    <div className='row'>
      <div className='col-xs-12'>
        <ContactInfo title="Addresses" type={true} forms={props.organization.addresses}/>
      </div>
    </div>
  </div>
)
