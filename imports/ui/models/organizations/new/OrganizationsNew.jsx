import React from 'react';
import TextField from 'material-ui/TextField';
import {indigo500} from 'material-ui/styles/colors';
import MainPanel from '../../../structure/main_panel/MainPanel';
import Addresses from '../../contact_info/addresses/Addresses';
import Telephones from '../../contact_info/telephones/Telephones';


const focusColor ={
  color: indigo500,
  borderColor: indigo500
};


export default class OrganizationsNew extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <MainPanel classes='container-fluid'>
        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="name"
                type="text"
                className="input-lg"
                hintText=""
                floatingLabelText="Organization Name"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="name"
                type="text"
                className=""
                hintText=""
                floatingLabelText="Email"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <Addresses title="Addresses"/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <Telephones title="Telephones"/>
          </div>
        </div>

      </MainPanel>
    )
  }
}
