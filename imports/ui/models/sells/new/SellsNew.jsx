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



export default class SellsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {discount_type: "%"}

    this.handleDiscountToggle = this.handleDiscountToggle.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  handleDiscountToggle(){
    if(this.state.discount_type === '%'){
      this.setState({discount_type: "$"})
    }else{
      this.setState({discount_type: "%"})
    }
  }

  handleOnClose(event){
    this.props.onCloseRight(false);
    this.refs['details'].closeSelectorLists();
  }


  render(){
    return(
      <MainPanel
        classes='container-fluid'
        panelID='right-drawer'
        toolbar={
          <FormActionBar onClear={this.handleOnClose} title='New Sell'/>
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

        <Details ref='details'/>

        <div className="row">
          <div className="col-xs-12">
            <MTextField
                name="total"
                type="number"
                className='input-lg'
                floatingLabelText="Total Price"
                fullWidth={true}
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


      </MainPanel>
    )
  }
}
