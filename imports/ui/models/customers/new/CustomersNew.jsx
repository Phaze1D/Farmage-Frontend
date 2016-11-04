import React from 'react';
import TextField from 'material-ui/TextField';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import MainPanel from '../../../structure/main_panel/MainPanel';
import ContactInfo from '../../contact_info/ContactInfo';
import TextArea from '../../../structure/textarea/TextArea';


const focusColor ={
  color: orangeA200,
  borderColor: orangeA200
};

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class CustomersNew extends React.Component{
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
                  name="first_name"
                  type="text"
                  className="input-lg"
                  hintText=""
                  floatingLabelText="First Name"
                  floatingLabelFocusStyle={focusColor}
                  underlineFocusStyle={focusColor}
                  fullWidth={true}/>

              <TextField
                  name="last_name"
                  type="text"
                  hintText=""
                  floatingLabelText="Last Name"
                  floatingLabelFocusStyle={focusColor}
                  underlineFocusStyle={focusColor}
                  fullWidth={true}/>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-7 sm-p-right'>
            <TextField
                name="email"
                type="text"
                className=""
                hintText=""
                floatingLabelText="Email"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>

          <div className='col-xs-5 sm-p-left'>
            <DatePicker
              name="date_of_birth"
              hintText="Birthday"
              floatingLabelText="Birthday"
              floatingLabelFocusStyle={focusColor}
              underlineFocusStyle={focusColor}
              fullWidth={true}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format} />
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="company"
                type="text"
                className=""
                floatingLabelText="Company"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <TextArea
              name="notes"
              type="text"
              className=""
              floatingLabelText="Notes"
              floatingLabelFocusStyle={focusColor}
              underlineFocusStyle={focusColor}
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
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
