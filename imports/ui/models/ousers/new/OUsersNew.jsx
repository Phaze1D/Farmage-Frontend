import React from 'react';
import TextField from 'material-ui/TextField';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import MainPanel from '../../../structure/main_panel/MainPanel';
import LToggler from '../../../structure/ltoggler/LToggler';



const focusColor = {
  color: orangeA200,
  borderColor: orangeA200
};

export default class UnitsNew extends React.Component{
  constructor(props){
    super(props);

  }



  render(){

    return(
      <MainPanel classes='container-fluid'>
        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="first_name"
                type="text"
                className="input-lg"
                hintText=""
                floatingLabelText="First Name"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
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

        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="email"
                type="text"
                hintText=""
                floatingLabelText="Email"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
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
          defaultToggled={false}/>

        <LToggler
          title="Viewer"
          subTitle="View everything"
          defaultToggled={false}/>

        <LToggler
          title="Expenses Manager"
          subTitle="View and edit expenses and providers"
          defaultToggled={false}/>

        <LToggler
          title="Sells Manager"
          subTitle="View and edit sells and clients"
          defaultToggled={false}/>

        <LToggler
          title="Units Manager"
          subTitle="View and edit units and yields"
          defaultToggled={false}/>

        <LToggler
          title="Inventories Manager"
          subTitle="View and edit inventories and products"
          defaultToggled={false}/>

        <LToggler
          title="Users Manager"
          subTitle="Invite and remove users"
          defaultToggled={false}/>

      </MainPanel>
    )
  }
}
