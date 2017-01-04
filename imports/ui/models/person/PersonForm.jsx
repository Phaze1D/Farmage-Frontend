import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DatePicker from 'material-ui/DatePicker';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import MainPanel from '../../structure/main_panel/MainPanel';
import ContactInfo from '../contact_info/ContactInfo';
import FormActionBar from '../../structure/form_action_bar/FormActionBar';
import TextArea from '../../structure/textarea/TextArea';


let DateTimeFormat = global.Intl.DateTimeFormat;

import {factoryPerson} from './faker/factoryPerson'

export default class PersonForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {showFields: false}

    this.handleOnClose = this.handleOnClose.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {this.setState({showFields: true})}, 500)
  }

  handleOnClose(event){
    this.props.onCloseRight(false);
  }

  render(){
    let person = {}
    let avatarBStyle = {}
    if(this.props.objectID){
      person = factoryPerson();

      if(person.avatarURL){
        avatarBStyle = {
          background: `url(${person.avatarURL})`
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

        <ReactCSSTransitionGroup component={FirstChild}
        transitionName={ {
          enter: 'enter-fade',
          leave: 'leave-fade',
          appear: 'appear-fade'
        } }
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
        transitionAppearTimeout={500}>
          {this.state.showFields &&
            <FormFields person={person} avatarBStyle={avatarBStyle}/>
          }
        </ReactCSSTransitionGroup>


      </MainPanel>
    )
  }
}

const FormFields = (props) => {

  return (
    <div>
      <div className='row'>

        <div className='col-xs-12 col-flex'>
          <IconButton className='avatar-button' style={props.avatarBStyle}>
            <ImageCameraAlt />
          </IconButton>

          <div style={{width: '100%'}}>
            <TextField
                name="first_name"
                type="text"
                defaultValue={props.person.firstName}
                className="input-lg"
                hintText=""
                floatingLabelText="First Name"
                fullWidth={true}/>

            <TextField
                name="last_name"
                type="text"
                defaultValue={props.person.lastName}
                hintText=""
                floatingLabelText="Last Name"
                fullWidth={true}/>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-xs-7 sm-p-right'>
          <TextField
              name="email"
              type="text"
              defaultValue={props.person.email}
              className=""
              hintText=""
              floatingLabelText="Email"
              fullWidth={true}/>
        </div>

        <div className='col-xs-5 sm-p-left'>
          <DatePicker
            name="date_of_birth"
            floatingLabelText="Date of Birth"
            defaultDate={props.person.dateOfBirth}
            fullWidth={true}
            formatDate={new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format} />
        </div>
      </div>


      <div className='row'>
        <div className='col-xs-12'>
          <TextField
              name="company"
              type="text"
              defaultValue={props.person.company}
              className=""
              floatingLabelText="Company"
              fullWidth={true}/>
        </div>
      </div>

      <div className='row'>
        <div className='col-xs-12'>
          <TextArea
            name="notes"
            type="text"
            defaultValue={props.person.notes}
            className=""
            floatingLabelText="Notes"
            fullWidth={true}
            multiLine={true}
            showCount={true}
            maxCount={512}
            rows={1} />
        </div>
      </div>

      <div className='row'>
        <div className='col-xs-12'>
          <ContactInfo title="Telephones" type={false} forms={props.person.telephones}/>
        </div>
      </div>


      <div className='row'>
        <div className='col-xs-12'>
          <ContactInfo title="Addresses" type={true} forms={props.person.addresses}/>
        </div>
      </div>

    </div>
  )
}


const FirstChild = (props) => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
