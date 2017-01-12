import React from 'react';
import Portal from 'react-portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PayIcon from 'material-ui/svg-icons/maps/local-atm';

import SelectorButton from '../../../structure/selector_button/SelectorButton';
import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import MTextField from '../../../structure/textfield/MTextField';
import Details from './Details';
import {factorySell} from '../faker/factorySell';
import Big from 'big.js';
Big.DP = 10


export default class SellsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {showFields: false}
    this.fabLeft = false;

    this.handleScroll = this.handleScroll.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);

    this.sell = {}
    if(this.props.objectID){
      this.sell = factorySell();
    }
  }

  componentDidMount(){
    setTimeout(() => {this.setState({showFields: true})}, 550)
  }

  handleOnClose(event){
    this.props.onCloseRight(false);
    this.refs.formFields.handleOnClose();
  }

  handleScroll(scrollTop, previousScroll){  
    let topNum = 212 - document.getElementsByClassName('toolbar')[0].clientHeight

    if(scrollTop <= topNum){
      let fab = document.getElementsByClassName('sell-fab')[0]
      if(scrollTop > previousScroll && !this.fabLeft){
        fab.className = "sell-fab leave-fab leave-fab-active";
        this.fabLeft = true;
      }else if(scrollTop < previousScroll && this.fabLeft){

        fab.className = "sell-fab enter-fab enter-fab-active";
        this.fabLeft = false;
      }
    }
  }


  render(){
    return(
      <MainPanel
        classes='container-fluid'
        panelID='right-drawer'
        onScroll={this.handleScroll}
        toolbar={
          <FormActionBar onClear={this.handleOnClose} title={this.props.headerTitle}/>
        }>

        <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'enter-sell-fab',
            leave: 'leave-sell-fab',
            appear: 'appear-sell-fab'
          } }
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}
          transitionAppear={true}
          transitionAppearTimeout={700}>

          <FloatingActionButton key='fab-sell' secondary={true} disabled={false} onTouchTap={this.toggleRight} className="sell-fab">
            <PayIcon className="icon"/>
          </FloatingActionButton>
        </ReactCSSTransitionGroup>

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
              ref='formFields'
              isUpdate={this.props.isUpdate}
              sell={this.sell}/>
          }
        </ReactCSSTransitionGroup>

      </MainPanel>
    )
  }
}


class FormFields extends React.Component{
  constructor(props){
    super(props)
    this.state = {discount_type: "%", total: 0, subTotal: 0, taxTotal: 0}
    this.details = this.props.sell.details ? this.props.sell.details : []

    this.handleDiscountToggle = this.handleDiscountToggle.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  componentDidMount() {
    let subT = Big(0);
    let taxT = Big(0);

    for (let i = 0; i < this.details.length; i++) {
      let detail = this.props.sell.details[i];
      let psubT = Big(detail.unitPrice).times(detail.quantity)
      let pTaxT = Big(detail.taxRate).div(100).times(psubT)
      subT = subT.plus(psubT)
      taxT = taxT.plus(pTaxT)
    }


    this.setState({
      total: Number(subT.toString()) + Number(taxT.toString()),
      subTotal: Number(subT.toString()),
      taxTotal: Number(taxT.toString())
    })

  }

  handleOnClose(event){
    this.refs.details.closeSelectorLists();
  }

  handleQuantityChange(previousAmounts, newAmounts){
    let difSubT = Big(newAmounts.subTotal).minus(previousAmounts.subTotal);
    let difTaxT = Big(newAmounts.taxTotal).minus(previousAmounts.taxTotal);
    let difToT = Big(newAmounts.total).minus(previousAmounts.total);

    let newSubT = Number(difSubT.plus(this.state.subTotal).toString());
    let newTaxT = Number(difTaxT.plus(this.state.taxTotal).toString());
    let newToT = Number(difToT.plus(this.state.total).toString());

    this.setState({total: newToT, subTotal: newSubT, taxTotal: newTaxT})


  }

  handleDiscountToggle(){
    if(this.state.discount_type === '%'){
      this.setState({discount_type: "$"})
    }else{
      this.setState({discount_type: "%"})
    }
  }

  render(){

    return(
      <div className='form-fields'>

        <Details
          onRequestQuantity={this.handleQuantityChange}
          ref='details'
          details={this.details}/>

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
                floatingLabelText="Tax Total"
                fullWidth={true}
                value={this.state.taxTotal.toFixed(2)}
                disabled={true}
                prefix="$"
                prefixSide="left"/>

          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 sm-p-right">
            <TextField
                name="status"
                type="text"
                hintText=""
                floatingLabelText="Status"
                fullWidth={true}/>
          </div>

          <div className="col-xs-6 sm-p-left">
            <TextField
                name="discount"
                type="number"
                hintText=""
                floatingLabelText="Discount"
                fullWidth={true}/>

              <RaisedButton label={this.state.discount_type} className='discount-b' onTouchTap={this.handleDiscountToggle}/>

          </div>
        </div>

        <div className='row'>
          <div className="col-xs-12">
            <TextField
              name="reference"
              type="text"
              hintText=""
              floatingLabelText="Custom Reference ID"
              fullWidth={true}/>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
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
            <SelectorButton title="Customer"/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Telephone"/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Shipping Address"/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Billing Address"/>
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
