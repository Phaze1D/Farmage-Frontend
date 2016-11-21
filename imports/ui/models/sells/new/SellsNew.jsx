import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionPayment from 'material-ui/svg-icons/action/payment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


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
  }


  render(){
    return(
      <MainPanel classes='container-fluid' header={
          <FormActionBar onClear={this.handleOnClose}/>
        }>

        <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'enter-fab',
            leave: 'leave-fab',
            appear: 'appear-fab'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={400}>

          <FloatingActionButton key='fab-sell' secondary={true} disabled={false} onTouchTap={this.toggleRight} className="sell-fab">
            <ActionPayment className="icon"/>
          </FloatingActionButton>
        </ReactCSSTransitionGroup>

        <Details/>

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
