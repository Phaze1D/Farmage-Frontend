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
import PersonSelected from '../../person/PersonSelected';

import PersonsSelectorList from '../../person/PersonsSelectorList';
import UnitSelectorList from '../../units/selector_items/UnitSelectorList';

import MFade from '../../../structure/mfade/MFade';
import Details from './Details'
import {randomImageColor} from '../../../structure/app/RandomColor.js';

import Big from 'big.js';
Big.DP = 10

import {factoryExpenseR} from '../faker/factoryExpense';




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
      this.expense = factoryExpenseR();
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
            <UnitSelectorList key='us' onRequestChange={this.toggleUnitSelector} onlyOne={false}/>
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

    this.handleTotalPriceChange = this.handleTotalPriceChange.bind(this);
    this.items = props.expense.items ? props.expense.items : []
  }

  handleTotalPriceChange(previousAmounts, newAmounts){
    this.refs.totalFields.handleTotalPriceChange(previousAmounts, newAmounts)
  }

  render(){

    return(
      <div className='form-fields'>

        <Details
          onRequestQuantity={this.handleTotalPriceChange}
          items={this.items}
          toggleSelector={this.props.toggleUnitSelector}/>

        <TotalFields
          ref='totalFields'
          extraCost={this.props.expense.extra}
          items={this.items}/>

        <div className='row'>
          <div className="col-xs-8 sm-p-right">
            <TextField
              name="reference"
              type="text"
              hintText=""
              defaultValue={this.props.expense.customRef}
              floatingLabelText="Custom Reference ID"
              fullWidth={true}/>
          </div>

          <div className="col-xs-4 sm-p-left">
            <DatePicker
              name="date_bought"
              floatingLabelText="Date Bought"
              fullWidth={true}
              defaultDate={this.props.expense.createdAt ? this.props.expense.createdAt : new Date()}
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


class TotalFields extends React.Component{
  constructor(props){
    super(props)
    this.state = {total: 0, subTotal: 0, extra: 0}

    this.handleTotalPriceChange = this.handleTotalPriceChange.bind(this);
    this.handleExtraChange = this.handleExtraChange.bind(this)
  }

  componentDidMount() {
    let subT = Big(0);
    let taxT = Big(0);

    for (let i = 0; i < this.props.items.length; i++) {
      let item = this.props.items[i];
      let psubT = Big(item.unitPrice).times(item.quantity)
      let pTaxT = Big(item.taxRate).div(100).times(psubT)
      subT = subT.plus(psubT).plus(pTaxT)
    }

    let extra = this.props.extraCost ? this.props.extraCost : 0
    this.setState({
      total: Number(subT.toString()) + Number(taxT.toString()) + extra,
      subTotal: Number(subT.toString()),
      extra: extra
      })
  }


  handleTotalPriceChange(previousAmounts, newAmounts){
    let difSubT = Big(newAmounts.subTotal).minus(previousAmounts.subTotal);

    let newSubT = Number(difSubT.plus(this.state.subTotal).toString());
    let newToT = Number(difSubT.plus(this.state.total).toString());

    this.setState({total: newToT, subTotal: newSubT})
  }

  handleExtraChange(event){
    let extra = Number(event.currentTarget.value)

    let newT = this.state.total + (extra - this.state.extra)
    this.setState({total: newT, extra: extra })
  }

  render(){

    return(
      <div>
        <div className='row'>
          <div className='col-xs-12 col-flex'>
            <IconButton className='avatar-button'>
              <ActionReceipt />
            </IconButton>

            <div style={{width: '100%'}}>
              <MTextField
                  name="sub_total"
                  type="number"
                  floatingLabelText="Sub Total"
                  fullWidth={true}
                  value={this.state.subTotal.toFixed(2)}
                  disabled={true}
                  prefix="$"
                  prefixSide="left"/>


              <MTextField
                  name="tax_total"
                  type="number"
                  floatingLabelText="Extra Costs or Discounts"
                  fullWidth={true}
                  disabled={false}
                  defaultValue={this.props.extraCost ? this.props.extraCost.toFixed(2) : '0.00'}
                  onChange={this.handleExtraChange}
                  prefix="$"
                  prefixSide="left"/>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
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
      </div>
    )
  }
}


function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
