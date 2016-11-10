import React from 'react';
import TextField from 'material-ui/TextField';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import ActionReceipt from 'material-ui/svg-icons/action/receipt';
import AutoComplete from 'material-ui/AutoComplete';


import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import MTextField from '../../../structure/textfield/MTextField';



const focusColor ={
  color: orangeA200,
  borderColor: orangeA200
};

const dataS = ["Sheep Food", 'Chicken Food', "Dog Food", "Employee Salary", "Gasoline", "LightBulb", "Some Very Long Item To Check Phone Handling"]

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ExpensesNew extends React.Component{
  constructor(props){
    super(props);

    this.state = {total_price: ''}
    this.handleTotalPriceChange = this.handleTotalPriceChange.bind(this);
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
      <MainPanel classes='container-fluid'>
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
                  floatingLabelText="Item Name"
                  floatingLabelFocusStyle={focusColor}
                  underlineFocusStyle={focusColor}
                  fullWidth={true}
                  dataSource={dataS}/>

              <TextField
                  name="quantity"
                  type="number"
                  hintText=""
                  floatingLabelText="Quantity"
                  ref={(input) => this.quantityTF = input}
                  onChange={this.handleTotalPriceChange}
                  floatingLabelFocusStyle={focusColor}
                  underlineFocusStyle={focusColor}
                  fullWidth={true}/>

            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-4 sm-p-right'>
            <MTextField
                name="unit_price"
                type="number"
                className=""
                hintText=""
                floatingLabelText="Unit Price"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
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
                className=""
                hintText=""
                floatingLabelText="Tax Rate"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
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
                floatingLabelText="Total Price"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
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

          <div className="col-xs-4 sm-p-left">
            <DatePicker
              name="date_bought"
              hintText="Bought"
              floatingLabelText="Bought"
              floatingLabelFocusStyle={focusColor}
              underlineFocusStyle={focusColor}
              fullWidth={true}
              defaultDate={new Date()}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              }).format} />
          </div>
        </div>




      </MainPanel>
    )
  }
}
