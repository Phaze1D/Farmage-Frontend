import React from 'react';
import TextField from 'material-ui/TextField';
import {indigo500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import uuid from 'uuid';
import classnames from 'classnames';


import AddressForm from './AddressForm';
import TelephoneForm from './TelephoneForm';


export default class ContactInfo extends React.Component{
  constructor(props){
    super(props);
    this.handleAddTouch = this.handleAddTouch.bind(this);
    this.state = {forms: []};
  }

  handleAddTouch(){
    const newForms = this.state.forms.concat([uuid.v1()]);
    this.setState({forms: newForms});
  }

  handleRemoveTouch(i){
    let newForms = this.state.forms.slice();
    newForms.splice(i, 1);
    this.setState({forms: newForms});
  }

  render(){

    const forms = this.state.forms.map(function(key, i){
      if(this.props.type){
        return(<AddressForm key={key} onRemoveCall={() => this.handleRemoveTouch(i)} />)
      }else{
        return(<TelephoneForm key={key} onRemoveCall={() => this.handleRemoveTouch(i)} />)
      }
    }, this);

    const formClass = classnames({ 'address': this.props.type}, {'telephone': !this.props.type});

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

        <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'enter-'+formClass,
            leave: 'leave-'+formClass,
            appear: 'appear'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
          {forms}
        </ReactCSSTransitionGroup>



      </div>
    )
  }
}


ContactInfo.PropTypes = {
  title:  React.PropTypes.string.isRequired,
  type: React.PropTypes.bool.isRequired
}
