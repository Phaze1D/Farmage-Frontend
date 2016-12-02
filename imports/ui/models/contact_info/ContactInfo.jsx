import React from 'react';
import TextField from 'material-ui/TextField';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import uuid from 'uuid';
import classnames from 'classnames';

import Form from './Form';


export default class ContactInfo extends React.Component{
  constructor(props){
    super(props);
    this.handleAddTouch = this.handleAddTouch.bind(this);
    this.handleContactTouch = this.handleContactTouch.bind(this);
    this.state = {forms: []};
  }

  handleContactTouch(){
    if(this.state.forms.length === 0){
      const newForms = this.state.forms.concat([uuid.v1()]);
      this.setState({forms: newForms});
    }
  }

  handleAddTouch(event){
    event.stopPropagation();
    if(this.state.forms.length < 5){
      const newForms = this.state.forms.concat([uuid.v1()]);
      this.setState({forms: newForms});
    }
  }

  handleRemoveTouch(i){
    let newForms = this.state.forms.slice();
    newForms.splice(i, 1);
    this.setState({forms: newForms});
  }

  render(){
    const contactBClasses = classnames('contact-button', {'highlight':this.state.forms.length > 0});

    const forms = this.state.forms.map((key, i) => (
      <Form key={key} type={this.props.type} onRemoveCall={() => this.handleRemoveTouch(i)} />
    ));

    const formClass = classnames({ 'address': this.props.type}, {'telephone': !this.props.type});

    return(
      <div>
        <div className={contactBClasses} onTouchTap={this.handleContactTouch}>
          <div className='title'>
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
