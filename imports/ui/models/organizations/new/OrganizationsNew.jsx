import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import MainPanel from '../../../structure/main_panel/MainPanel';
import ContactInfo from '../../contact_info/ContactInfo';




export default class OrganizationsNew extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <MainPanel classes='container-fluid'>
        <div className='row'>

          <div className='col-xs-12 col-flex'>
            <IconButton className='avatar-button'>
              <ImageCameraAlt />
            </IconButton>


            <TextField
                name="name"
                type="text"
                className="input-lg"
                hintText=""
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
                floatingLabelText="Email"
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <ContactInfo title="Telephones" type={false}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <ContactInfo title="Addresses" type={true}/>
          </div>
        </div>

      </MainPanel>
    )
  }
}
