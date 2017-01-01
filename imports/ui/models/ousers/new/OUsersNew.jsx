import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import MainPanel from '../../../structure/main_panel/MainPanel';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import LToggler from '../../../structure/ltoggler/LToggler';



export default class UnitsNew extends React.Component{
  constructor(props){
    super(props);

    this.handleOnClose = this.handleOnClose.bind(this);
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
          <FormActionBar onClear={this.handleOnClose} title='Invite User'/>
        }>
        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="first_name"
                type="text"
                className="input-lg"
                hintText=""
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
