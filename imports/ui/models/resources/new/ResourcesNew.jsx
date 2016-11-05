import React from 'react';
import TextField from 'material-ui/TextField';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import MainPanel from '../../../structure/main_panel/MainPanel';
import ContactInfo from '../../contact_info/ContactInfo';


const focusColor ={
  color: orangeA200,
  borderColor: orangeA200
};


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
                  floatingLabelFocusStyle={focusColor}
                  underlineFocusStyle={focusColor}
                  fullWidth={true}/>

              <TextField
                  name="measurement_unit"
                  type="text"
                  hintText=""
                  floatingLabelText="Measurement Unit"
                  floatingLabelFocusStyle={focusColor}
                  underlineFocusStyle={focusColor}
                  fullWidth={true}/>
            </div>
          </div>
        </div>
      </MainPanel>
    )
  }
}
