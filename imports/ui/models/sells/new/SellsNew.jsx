import React from 'react';
import TextField from 'material-ui/TextField';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';

import SelectorButton from '../../../structure/selector_button/SelectorButton';
import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import MTextField from '../../../structure/textfield/MTextField';



const focusColor ={
  color: orangeA200,
  borderColor: orangeA200
};


export default class SellsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {discount_type: "%"}

    this.handleDiscountToggle = this.handleDiscountToggle.bind(this);
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
      <MainPanel classes='container-fluid'>

        <div className="row">
          <div className="col-xs-12">
            <MTextField
                name="total"
                type="number"
                className='input-lg'
                floatingLabelText="Total Price"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
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
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
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
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
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
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>

          <div className="col-xs-6 sm-p-left">
            <TextField
                name="discount"
                type="number"
                hintText=""
                floatingLabelText="Discount"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
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
              floatingLabelFocusStyle={focusColor}
              underlineFocusStyle={focusColor}
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
