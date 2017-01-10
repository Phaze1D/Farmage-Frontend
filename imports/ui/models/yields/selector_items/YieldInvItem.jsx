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
    this.state = {batchAmount: 0}

    this.handleOnYieldChanged = this.handleOnYieldChanged.bind(this);
    this.handleResourceSelectorClick = this.handleResourceSelectorClick.bind(this)

    this.yields = []
    for(let i = 0; i < Math.round(Math.random() * 10); i++){
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
      this.setState({batchAmount: newInvA.toFixed(0)})
    }else{
      this.setState({batchAmount: newInvA.toString()})
    }
  }

  handleResourceSelectorClick(event){
    this.props.toggleYieldSelector(event, `${this.props.resource.name} Yields`)
  }

  render(){
    const modError = !Big(this.state.batchAmount).mod(1).eq(0);
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
              toggleSelector={this.handleResourceSelectorClick}/>
          </div>
        </div>

        {yieldList.length > 0 &&
          <div className='row'>
            <div className='col-xs-12'>
              <div className='selector-item'>

                <div className={inAClasses}>
                  Batch Amount - {this.state.batchAmount}

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


class YieldDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {available: this.props.yield.amount}

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event, newValue){
    newValue = newValue.length > 0 ? newValue : 0;
    let newAvi = Big(this.props.yield.amount).minus(newValue)
    this.setState({available: newAvi.toString()})
    this.props.onRequestChange(event, newValue)
  }

  render(){
    const error = this.props.hasError ? ' ' : null;
    const identifer = this.props.yield.identifer ? this.props.yield.identifer : this.props.yield._id
    const createdAt = new DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(this.props.yield.createdAt)

    let expiresAt = 'Never'
    if(this.props.yield.expiresAt){
      expiresAt = new DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(this.props.yield.expiresAt)
    }

    return (
      <div className='yield-section'>
        <div className='yield-info'>
          <span>Yield Identifier</span>
          {identifer}
        </div>

        <div className='yield-info'>
          <span>Available</span>
          {this.state.available}
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
            className={this.props.resourceID}
            boxClass="input-row"
            hintText=""
            floatingLabelText="Take"
            fullWidth={true}
            step='any'
            min={0}
            onChange={this.handleOnChange}
            prefix={this.props.measurementUnit}
            prefixSide="right"/>

      </div>
    )
  }
}
