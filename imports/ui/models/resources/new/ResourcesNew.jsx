import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import MainPanel from '../../../structure/main_panel/MainPanel';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import MFade from '../../../structure/mfade/MFade';
import ContactInfo from '../../contact_info/ContactInfo';
import { factoryResource } from '../faker/factoryResource';




export default class ResourcesNew extends React.Component{
  constructor(props){
    super(props);
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  handleOnClose(event){
    this.props.onCloseRight(false);
  }

  render(){

    let resource = {}
    let imageBStyle = {}
    if(this.props.objectID){
      resource = factoryResource();

      if(resource.imageUrl){
        imageBStyle = {
          background: `url(${resource.imageUrl})`
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
            resource={resource}
            imageBStyle={imageBStyle}/>
        </MFade>

      </MainPanel>
    )
  }
}


const FormFields = (props) => (
  <div className='form-fields'>
    <div className='row'>
      <div className='col-xs-12 col-flex'>
        <IconButton className='avatar-button' style={props.imageBStyle}>
          <ImageCameraAlt />
        </IconButton>

        <div style={{width: '100%'}}>
          <TextField
            name="name"
            type="text"
            defaultValue={props.resource.name}
            className="input-lg"
            hintText=""
            floatingLabelText="Name"
            fullWidth={true}/>

          <TextField
            name="measurement_unit"
            type="text"
            defaultValue={props.resource.measurementUnit}
            hintText=""
            floatingLabelText="Measurement Unit"
            fullWidth={true}/>
        </div>
      </div>
    </div>
  </div>
)


let FirstChild = (props) => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
