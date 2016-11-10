import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import MainPanel from '../../../structure/main_panel/MainPanel';
import ContactInfo from '../../contact_info/ContactInfo';




export default class ResourcesNew extends React.Component{
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

            <div style={{width: '100%'}}>
              <TextField
                  name="name"
                  type="text"
                  className="input-lg"
                  hintText=""
                  floatingLabelText="Name"
                  fullWidth={true}/>

              <TextField
                  name="measurement_unit"
                  type="text"
                  hintText=""
                  floatingLabelText="Measurement Unit"
                  fullWidth={true}/>
            </div>
          </div>
        </div>
      </MainPanel>
    )
  }
}
