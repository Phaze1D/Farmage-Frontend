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
import AmountChanges from '../../amount_changes/AmountChanges';
import {factoryYield} from '../faker/factoryYield';

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {usopen: false, rsopen: false, showFields: false}

    this.handleOnClose = this.handleOnClose.bind(this);
    this.toggleUnitSelector = this.toggleUnitSelector.bind(this);
    this.toggleResourceSelector = this.toggleResourceSelector.bind(this);

    this.yield = {}
    if(this.props.objectID){
      this.yield = factoryYield();
    }
  }

  componentDidMount(){
    setTimeout(() => {this.setState({showFields: true})}, 550)
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
            <FormFields
              isUpdate={this.props.isUpdate}
              yield={this.yield}
              toggleUnitSelector={this.toggleUnitSelector}
              toggleResourceSelector={this.toggleResourceSelector}/>
          }
        </ReactCSSTransitionGroup>



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

class FormFields extends React.Component{
  constructor(props){
    super(props)
    this.state = {minDate: this.props.yield.createdAt ? this.props.yield.createdAt : new Date()}
  }

  render(){

    const identifer = this.props.yield.identifer ? this.props.yield.identifer : this.props.yield._id;

    return(
      <div>
        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="name"
                type="text"
                defaultValue={identifer}
                className="input-lg"
                hintText=""
                floatingLabelText="Identifier"
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-6 sm-p-right'>
            <DatePicker
              name="created_at"
              floatingLabelText="Created Date"
              fullWidth={true}
              onChange={ (event, date) => {this.setState({minDate: date}) } }
              defaultDate={this.props.yield.createdAt ? this.props.yield.createdAt : new Date()}
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
              defaultDate={this.props.yield.expiresAt}
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
              defaultValue={this.props.yield.notes}
              floatingLabelText="Notes"
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>
        </div>

        <AmountChanges
          type='Yield'
          identifer={identifer}
          isUpdate={this.props.isUpdate}
          defaultValue={this.props.yield.amount}
          amountLabel='Amount'/>


        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Resource" highlight={this.props.yield.resource} toggleSelector={this.props.toggleResourceSelector}/>
          </div>
        </div>

        {this.props.yield.resource &&
          <ResourceYieldItem resource={this.props.yield.resource}/>
        }



        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="From Unit" highlight={this.props.yield.unit} toggleSelector={this.props.toggleUnitSelector}/>
          </div>
        </div>

        {this.props.yield.unit &&
          <UnitSelected unit={this.props.yield.unit}/>
        }
      </div>
    )
  }
}


function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
