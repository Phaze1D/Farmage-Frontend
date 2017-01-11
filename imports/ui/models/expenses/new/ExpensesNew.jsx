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
import {randomImageColor} from '../../../structure/app/RandomColor.js';
import {factoryExpense} from '../faker/factoryExpense';



const dataS = ["Sheep Food", 'Chicken Food', "Dog Food", "Employee Salary", "Gasoline", "LightBulb", "Some Very Long Item To Check Phone Handling"]

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ExpensesNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {usopen: false, psopen: false, showFields: false};
    this.handleOnClose = this.handleOnClose.bind(this);
    this.toggleUnitSelector = this.toggleUnitSelector.bind(this);
    this.togglePersonSelector = this.togglePersonSelector.bind(this);

    this.expense = {}
    if(this.props.objectID){
      this.expense = factoryExpense();
    }
  }

  componentDidMount(){
    setTimeout(() => {this.setState({showFields: true})}, 550)
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
              expense={this.expense}
              toggleUnitSelector={this.toggleUnitSelector}
              togglePersonSelector={this.togglePersonSelector}/>
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
    this.state = {total_price: ''}

    this.handleTotalPriceChange = this.handleTotalPriceChange.bind(this);
  }

  componentDidMount() {
    this.handleTotalPriceChange()
  }

  handleTotalPriceChange(){
    uv = this.unitPriceTF.input.value;
    rv = this.taxRateTF.input.value;
    qv = this.quantityTF.input.value;

    uv = uv.length > 0 ? uv : 0.00;
    rv = rv.length > 0 ? rv/100 : 0.00;
    qv = qv.length > 0 ? qv : 0;
    tp = uv * (1 + rv)
    tp *= qv;
    this.setState({total_price: tp.toFixed(2)});
  }

  render(){

    return(
      <div className='form-fields'>

        <div className='row'>
          <div className='col-xs-12 col-flex'>
            <IconButton className='avatar-button'>
              <ActionReceipt />
            </IconButton>

            <div style={{width: '100%'}}>
              <AutoComplete
                  name="name"
                  type="text"
                  className="input-lg"
                  filter={AutoComplete.caseInsensitiveFilter}
                  maxSearchResults={5}
                  hintText=""
                  searchText={this.props.expense.itemName}
                  floatingLabelText="Item Name"
                  fullWidth={true}
                  dataSource={dataS}/>

              <TextField
                  name="quantity"
                  type="number"
                  hintText=""
                  defaultValue={this.props.expense.quantity}
                  floatingLabelText="Quantity"
                  ref={(input) => this.quantityTF = input}
                  onChange={this.handleTotalPriceChange}
                  fullWidth={true}/>

            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-4 sm-p-right'>
            <MTextField
                name="unit_price"
                type="number"
                defaultValue={this.props.expense.unitPrice}
                className=""
                hintText=""
                floatingLabelText="Unit Cost"
                mref={(input) => this.unitPriceTF = input}
                onChange={this.handleTotalPriceChange}
                fullWidth={true}
                prefix="$"
                prefixSide="left"/>
          </div>

          <div className='col-xs-4 sm-p-left sm-p-right'>
            <MTextField
                name="tax_rate"
                type="number"
                defaultValue={this.props.expense.taxRate}
                className=""
                hintText=""
                floatingLabelText="Tax Rate"
                mref={(input) => this.taxRateTF = input}
                onChange={this.handleTotalPriceChange}
                fullWidth={true}
                prefix="%"
                prefixSide="right"/>
          </div>

          <div className='col-xs-4 sm-p-left'>
            <MTextField
                name="tprice"
                type="number"
                className=""
                hintText=""
                value={this.state.total_price}
                disabled={true}
                floatingLabelText="Total Cost"
                fullWidth={true}
                prefix="$"
                prefixSide="left"/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-8 sm-p-right'>
            <TextArea
              name="notes"
              type="text"
              defaultValue={this.props.expense.notes}
              className=""
              floatingLabelText="Notes"
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>

          <div className="col-xs-4 sm-p-left">
            <DatePicker
              name="date_bought"
              hintText="Bought"
              floatingLabelText="Bought"
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
            <SelectorButton title="Provider" highlight={this.props.expense.provider} toggleSelector={this.props.togglePersonSelector}/>
          </div>
        </div>

        {this.props.expense.provider &&
          <PersonSelected person={this.props.expense.provider}/>
        }


        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Unit" highlight={this.props.expense.unit} toggleSelector={this.props.toggleUnitSelector}/>
          </div>
        </div>

        {this.props.expense.unit &&
          <UnitSelected unit={this.props.expense.unit}/>
        }

      </div>
    )
  }
}


function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
