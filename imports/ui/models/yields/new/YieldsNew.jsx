import React from 'react';
import Portal from 'react-portal';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';


import SelectorButton from '../../../structure/selector_button/SelectorButton';
import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import UnitSelected from '../../units/selector_items/UnitSelected';
import ResourceYieldItem from '../../resources/selector_items/ResourceYieldItem';
import MTextField from '../../../structure/textfield/MTextField';
import ResourcesSelectorList from '../../resources/selector_items/ResourcesSelectorList';
import UnitSelectorList from '../../units/selector_items/UnitSelectorList';

import {randomImageColor, alphaImageColor} from '../../../structure/app/RandomColor.js';




let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {minDate: new Date(), usopen: false, rsopen: false}

    this.handleOnClose = this.handleOnClose.bind(this);
    this.toggleUnitSelector = this.toggleUnitSelector.bind(this);
    this.toggleResourceSelector = this.toggleResourceSelector.bind(this);
  }

  handleOnClose(event){
    this.setState({usopen: false, rsopen: false});
    this.props.onCloseRight(false);
  }

  toggleUnitSelector(event){
    this.setState({usopen: !this.state.usopen, rsopen: false});
  }

  toggleResourceSelector(event){
    this.setState({rsopen: !this.state.rsopen, usopen: false});
  }


  render(){

    return(
      <MainPanel classes='container-fluid' header={
        <FormActionBar onClear={this.handleOnClose}/>
      }>

        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="name"
                type="text"
                className="input-lg"
                hintText=""
                floatingLabelText="Identifier"
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-6 sm-p-right'>
            <DatePicker
              name="date_bought"
              floatingLabelText="Created Date"
              fullWidth={true}
              onChange={ (event, date) => {this.setState({minDate: date}) } }
              defaultDate={new Date()}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }).format} />
          </div>

          <div className='col-xs-6 sm-p-left'>
            <DatePicker
              name="expiration_date"
              minDate={this.state.minDate}
              floatingLabelText="Expiration Date"
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
            <TextArea
              name="notes"
              type="text"
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
            <SelectorButton title="Resource" highlight={true} toggleSelector={this.toggleResourceSelector}/>
          </div>
        </div>

        <ResourceYieldItem backgroundColor={alphaImageColor('Y')}/>

        <div className="row">
          <div className='col-xs-8 sm-p-right'>
            <TextArea
              name="movement_note"
              type="text"
              className=""
              defaultValue="Initial amount"
              floatingLabelText="Movement Notes"
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              disabled={false}
              rows={1} />
          </div>

          <div className='col-xs-4 sm-p-left'>
            <TextField
                name="amount"
                type="number"
                defaultValue="0"
                hintText=""
                floatingLabelText="Amount"
                fullWidth={true}
                disabled={false}/>
          </div>
        </div>


        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="From Unit" highlight={true} toggleSelector={this.toggleUnitSelector}/>
          </div>
        </div>

        <UnitSelected/>

        <Portal isOpened={true}>
          <ReactCSSTransitionGroup component={FirstChild}
          transitionName={ {
            enter: 'enter-selector-list',
            leave: 'leave-selector-list',
            appear: 'appear-selector-list'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={400}>

          {this.state.usopen &&
            <UnitSelectorList key='us' onRequestChange={this.toggleUnitSelector} onlyOne={true}/>
          }

          </ReactCSSTransitionGroup>
        </Portal>

        <Portal isOpened={true}>
          <ReactCSSTransitionGroup component={FirstChild}
          transitionName={ {
            enter: 'enter-selector-list',
            leave: 'leave-selector-list',
            appear: 'appear-selector-list'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={400}>

          {this.state.rsopen &&
            <ResourcesSelectorList key='rs' onRequestChange={this.toggleResourceSelector} onlyOne={true}/>
          }

          </ReactCSSTransitionGroup>
        </Portal>

      </MainPanel>
    )
  }
}

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
