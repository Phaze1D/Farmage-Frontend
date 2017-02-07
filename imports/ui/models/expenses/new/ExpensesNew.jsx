import React from 'react';
import Portal from 'react-portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import ActionReceipt from 'material-ui/svg-icons/action/receipt';
import AutoComplete from 'material-ui/AutoComplete';

import SelectorButton from '../../../structure/selector_button/SelectorButton';
import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import MTextField from '../../../structure/textfield/MTextField';
import UnitSelected from '../../units/selector_items/UnitSelected';
import PersonSelected from '../../person/PersonSelected';
import PersonsSelectorList from '../../person/PersonsSelectorList';
import UnitSelectorList from '../../units/selector_items/UnitSelectorList';
import MFade from '../../../structure/mfade/MFade';
import Details from './Details'
import {randomImageColor} from '../../../structure/app/RandomColor.js';
import {factoryExpense} from '../faker/factoryExpense';



const dataS = ["Sheep Food", 'Chicken Food', "Dog Food", "Employee Salary", "Gasoline", "LightBulb", "Some Very Long Item To Check Phone Handling"]

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ExpensesNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {usopen: false, psopen: false};
    this.handleOnClose = this.handleOnClose.bind(this);
    this.toggleUnitSelector = this.toggleUnitSelector.bind(this);
    this.togglePersonSelector = this.togglePersonSelector.bind(this);

    this.expense = {}
    if(this.props.objectID){
      this.expense = factoryExpense();
    }
  }

  toggleUnitSelector(event){
    this.setState({usopen: !this.state.usopen, psopen: false});
  }

  togglePersonSelector(event){
    this.setState({psopen: !this.state.psopen, usopen: false});
  }

  handleOnClose(event){
    this.setState({usopen: false, psopen: false});
    this.props.onCloseRight(false);
  }

  render(){
    return(
      <MainPanel
        classes='container-fluid'
        panelID='right-drawer'
        toolbar={
          <FormActionBar onClear={this.handleOnClose} title={this.props.headerTitle}/>
        }>

        <MFade>
          <FormFields
            expense={this.expense}
            toggleUnitSelector={this.toggleUnitSelector}
            togglePersonSelector={this.togglePersonSelector}/>
        </MFade>


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

          {this.state.psopen &&
            <PersonsSelectorList key='ps' onRequestChange={this.togglePersonSelector} onlyOne={true} title='Providers'/>
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
    this.state = {total: 0, subTotal: 0}

    this.handleTotalPriceChange = this.handleTotalPriceChange.bind(this);

    this.items = []
  }

  componentDidMount() {
    this.handleTotalPriceChange()
  }

  handleTotalPriceChange(){

  }

  render(){

    return(
      <div className='form-fields'>

        <Details items={this.items} toggleSelector={this.props.toggleUnitSelector}/>


        <div className="row">
          <div className="col-xs-6 sm-p-right">
            <MTextField
                name="sub_total"
                type="number"
                floatingLabelText="Sub Total"
                fullWidth={true}
                value={this.state.subTotal.toFixed(2)}
                disabled={true}
                prefix="$"
                prefixSide="left"/>

          </div>

          <div className="col-xs-6 sm-p-left">
            <MTextField
                name="tax_total"
                type="number"
                floatingLabelText="Extra Costs or Discounts"
                fullWidth={true}
                disabled={false}
                defaultValue='0.00'
                prefix="$"
                prefixSide="left"/>

          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <MTextField
                name="total"
                type="number"
                className='input-lg'
                floatingLabelText="Total Price"
                fullWidth={true}
                value={this.state.total.toFixed(2)}
                disabled={true}
                prefix="$"
                prefixClass="input-lg"
                prefixSide="left"/>
          </div>
        </div>

        <div className='row'>
          <div className="col-xs-6">
            <TextField
              name="reference"
              type="text"
              hintText=""
              floatingLabelText="Custom Reference ID"
              fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <TextArea
              name="notes"
              type="text"
              defaultValue={this.props.expense.notes}
              className=""
              floatingLabelText="Description"
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>
        </div>





        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Provider" highlight={this.props.expense.provider} toggleSelector={this.props.togglePersonSelector}/>
          </div>
        </div>

        {this.props.expense.provider &&
          <PersonSelected person={this.props.expense.provider}/>
        }




      </div>
    )
  }
}


function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
