import React from 'react';
import TextField from 'material-ui/TextField';
import {indigo500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import AddressForm from './AddressForm';
import TelephoneForm from './TelephoneForm';
import update from 'immutability-helper';
import uuid from 'uuid';


export default class ContactInfo extends React.Component{
  constructor(props){
    super(props);
    this.handleAddTouch = this.handleAddTouch.bind(this);
    this.state = {forms: {}};
  }

  handleAddTouch(){
    this.setState( function(prevState, props) {
      const pForms = prevState.forms;
      const id = uuid.v1()
      pForms[id] = 'lk'
      return {forms: pForms}
    });
  }

  onRemoveCall(key){
    setTimeout(function(){
      this.setState( function(prevState, props) {
        const pForms = prevState.forms;
        delete pForms[key];
        return {forms: pForms}
      });
    }.bind(this), 400)

  }

  render(){

    return(
      <div>
        <div className='contact-button'>
          <div>
            {this.props.title}
          </div>

          <IconButton onTouchTap={this.handleAddTouch}>
            <ContentAddCircle />
          </IconButton>
        </div>

        {
          Object.keys(this.state.forms).map(function (key) {
              element = this.props.type ? <AddressForm key={key} value={key} onRemoveCall={this.onRemoveCall.bind(this)}/> : <TelephoneForm key={key} value={key} onRemoveCall={this.onRemoveCall.bind(this)}/>
            return(
              element
            )
          }, this)
        }

      </div>
    )
  }
}


ContactInfo.PropTypes = {
  title:  React.PropTypes.string.isRequired,
  type: React.PropTypes.bool.isRequired
}
