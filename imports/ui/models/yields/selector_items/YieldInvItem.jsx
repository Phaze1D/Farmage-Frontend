import React from 'react';
import MTextField from '../../../structure/textfield/MTextField';
import Divider from 'material-ui/Divider';
import SelectorButton from '../../../structure/selector_button/SelectorButton';
import {factoryYield} from '../faker/factoryYield';
import classnames from 'classnames'
import Big from 'big.js'
Big.DP = 10


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldInvItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {inventoryAmount: 0}

    this.handleOnYieldChanged = this.handleOnYieldChanged.bind(this);

    this.yields = []
    for(let i = 0; i < Math.round(Math.random() * 2); i++){
      this.yields.push(factoryYield())
    }
  }

  handleOnYieldChanged(event, newValue){
    const tfs = document.getElementsByClassName(this.props.resource._id)
    let sum = Big(0);
    for (var i = 0; i < tfs.length; i++) {
      let value = tfs[i].getElementsByTagName("INPUT")[0].value;
      value = value.length > 0 ? value : 0;
      sum = sum.plus(value)
    }
    const newInvA = sum.div(this.props.resource.amountPre)
    if(newInvA.mod(1).eq(0) ){
      this.setState({inventoryAmount: newInvA.toFixed(0)})
    }else{
      this.setState({inventoryAmount: newInvA.toString()})
    }

  }

  render(){
    const modError = !Big(this.state.inventoryAmount).mod(1).eq(0);
    const inAClasses = classnames('ytitle-info', {'error': modError})
    let errorMessage = modError ? 'Must be an Integer' : ''

    const yieldList = this.yields.map((_yield) =>
      <YieldDetail
        key={_yield._id}
        resourceID={this.props.resource._id}
        hasError={modError}
        yield={_yield}
        onRequestChange={this.handleOnYieldChanged}
        measurementUnit={this.props.resource.measurementUnit}/>
    )

    return(
      <div>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton
              title={this.props.resource.name}
              secTitle='Yields'
              subTitle={`Pre Product - ${this.props.resource.amountPre} ${this.props.resource.measurementUnit}`}
              showImage={true}
              imageUrl={this.props.resource.resource.imageUrl}
              highlight={yieldList.length > 0}
              toggleSelector={this.props.toggleYieldSelector}/>
          </div>
        </div>

        {yieldList.length > 0 &&
          <div className='row'>
            <div className='col-xs-12'>
              <div className='selector-item'>

                <div className={inAClasses}>
                  Inventory Amount - {this.state.inventoryAmount}

                  <span>
                    {errorMessage}
                  </span>
                </div>

                {yieldList}
              </div>
            </div>
          </div>
        }

      </div>
    )
  }
}


const YieldDetail = (props) => {
  const error = props.hasError ? ' ' : null;
  const identifer = props.yield.identifer ? props.yield.identifer : props.yield._id
  const createdAt = new DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(props.yield.createdAt)

  let expiresAt = 'Never'
  if(props.yield.expiresAt){
    expiresAt = new DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(props.yield.expiresAt)
  }

  return (
    <div className='yield-section'>
      <div className='yield-info'>
        <span>Yield Identifier</span>
        {identifer}
      </div>

      <div className='yield-info'>
        <span>Yield Amount</span>
        {props.yield.amount}
      </div>

      <div className='yield-info'>
        <span>Created Date</span>
        {createdAt}
      </div>

      <div className='yield-info'>
        <span>Expires At</span>
        {expiresAt}
      </div>

      <MTextField
          name="amount_taken"
          type="number"
          errorText={error}
          className={props.resourceID}
          boxClass="input-row"
          hintText=""
          floatingLabelText="Taken"
          fullWidth={true}
          step='any'
          min={0}
          onChange={props.onRequestChange}
          prefix={props.measurementUnit}
          prefixSide="right"/>

    </div>
  )
}
