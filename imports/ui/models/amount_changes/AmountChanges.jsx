import React from 'react';
import Portal from 'react-portal';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Big from 'big.js';
Big.DP = 10

import SelectorButton from '../../structure/selector_button/SelectorButton';
import TextArea from '../../structure/textarea/TextArea';
import MDialog from '../../structure/mdialog/MDialog';



export default class AmountChanges extends React.Component{
  constructor(props){
    super(props);
    this.state = {amount: this.props.defaultValue, showUpdate: false}
    this.handleChange = this.handleChange.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.onAmountChanged = this.onAmountChanged.bind(this);
  }

  handleChange(event){
    value = event.target.value.length > 0 ? event.target.value : 0
    this.setState({amount: value})
  }

  handleOnFocus(event){
    this.setState({showUpdate: true})
  }

  onCloseDialog(event){
    this.setState({showUpdate: false})
  }

  onAmountChanged(event, newAmount){
    newAmount = newAmount.length > 0 ? newAmount : 0
    let newA = Big(this.props.defaultValue).plus(newAmount)
    this.setState({amount: newA.toString()})
  }

  render(){
    const actions = [
      <FlatButton
        key='cancel'
        label="Cancel"
        secondary={true}
        keyboardFocused={false}
        onTouchTap={this.onCloseDialog}
      />,
      <FlatButton
        key='apply'
        label="Apply"
        secondary={true}
        keyboardFocused={false}
        onTouchTap={this.onCloseDialog}
      />
    ];

    return(
      <div>
        {this.props.isUpdate ?
          <UpdateEvent
          handleOnFocus={this.handleOnFocus}
          amount={this.props.defaultValue}
          amountLabel={this.props.amountLabel}/>
          :
          <NewEvent amountLabel={this.props.amountLabel}/>
        }

        <MDialog
          onRequestClose={()=> {}}
          overlayClasses='movement-overlay'
          dialogClasses='movement-dialog'
          actionClasses='am-actions'
          title={`New Movement`}
          actions={actions}
          popen={this.props.isUpdate}
          open={this.state.showUpdate}>

          <div>
            <div className='am-info-section'>
              <div className='am-info'>
                <span>{this.props.type} Identifier</span>
                {this.props.identifer}
              </div>

              <div className='am-info'>
                <span>{this.props.type} Amount</span>
                {this.state.amount}
              </div>
            </div>

            <div className='am-input-div'>
              <TextField
                id='ctf'
                ref='ctf'
                step='any'
                name="amount"
                type="number"
                onChange={this.onAmountChanged}
                hintText=""
                floatingLabelText='Change Amount By'
                fullWidth={true}/>
            </div>

            <div className='am-input-div' style={{marginBottom: '25px'}}>
              <TextArea
                name="description"
                type="text"
                floatingLabelText="Description"
                fullWidth={true}
                multiLine={true}
                showCount={true}
                maxCount={512}
                rows={1} />
            </div>


          </div>

        </MDialog>

      </div>
    )
  }
}

let UpdateEvent = (props) => (
  <div className="row row-flex">
    <div className='col-xs-12'>
      <TextField
          onTouchTap={props.handleOnFocus}
          name="amount"
          type="number"
          value={props.amount}
          hintText=""
          className="input-lg"
          floatingLabelText={props.amountLabel}
          fullWidth={true}/>
    </div>
  </div>
)


let NewEvent = (props) => (
  <div className="row row-flex">
    <div className='col-xs-8 sm-p-right'>
      <TextArea
        name="description"
        type="text"
        defaultValue="Initial amount"
        floatingLabelText="Movement Notes"
        fullWidth={true}
        multiLine={true}
        showCount={true}
        maxCount={512}
        rows={1} />
    </div>

    <div className='col-xs-4 sm-p-left'>
      <TextField
          name="amount"
          type="number"
          defaultValue="0"
          hintText=""
          floatingLabelText={props.amountLabel}
          fullWidth={true}/>
    </div>
  </div>
)
