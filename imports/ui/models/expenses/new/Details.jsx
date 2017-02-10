import React from 'react'
import Portal from 'react-portal';
import {Random} from 'meteor/random';
import TextField from 'material-ui/TextField';
import MTextField from '../../../structure/textfield/MTextField';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import SelectorButton from '../../../structure/selector_button/SelectorButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import {randomImageColor} from '../../../structure/app/RandomColor.js';
import Big from 'big.js';
Big.DP = 10


const dataS = ["Sheep Food", 'Chicken Food', "Dog Food", "Employee Salary", "Gasoline", "LightBulb", "Some Very Long Item To Check Phone Handling"]

export default class Details extends React.Component{
  constructor(props){
    super(props);
    this.state = {items: props.items};

    this.handleTouchAdd = this.handleTouchAdd.bind(this);

  }

  handleTouchAdd(event){
    event.stopPropagation();

    const newItems = this.state.items.concat([{
      _id: Random.id(),
      units: [],
      unitPrice: 0,
      quantity: 0,
      taxRate: 0
    }]);
    this.setState({items: newItems});
  }

  handleRemoveTouch(i){
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }


  render() {

    const items = this.state.items.map((item, i) => (
      <Item
        key={item._id}
        item={item}
        onRequestQuantity={this.props.onRequestQuantity}
        onRemoveCall={() => this.handleRemoveTouch(i)}
        toggleSelector={this.props.toggleSelector} />
    ));

    return (
      <div>
        <div className='details-header'>
          <div className='title'>
            Items
          </div>

          <IconButton onTouchTap={this.handleTouchAdd}>
            <ContentAddCircle className='add'/>
          </IconButton>
        </div>

        {items.reverse()}

      </div>

    )
  }
}

class Item extends React.Component{
  constructor(props){
    super(props);
    this.state = {quantity: props.item.quantity, unitPrice: props.item.unitPrice, taxRate: props.item.taxRate}

    this.onRemove = this.onRemove.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this)
    this.calculateOldNew = this.calculateOldNew.bind(this)
  }

  componentDidMount() {
    this.refs.row.style.height = this.refs.row.getElementsByClassName('col-xs-12')[0].clientHeight + "px"
    setTimeout(() => {
      this.refs.row.style.height = 'auto'
    }, 500)
  }

  onRemove(event){
    this.refs.row.style.height = this.refs.row.getElementsByClassName('col-xs-12')[0].clientHeight + "px"
    this.calculateOldNew(0, 0, 0)
    setTimeout(() => {
      this.refs.row.style.height = '0px'
    }, 150)

    setTimeout(() => {this.props.onRemoveCall()}, 700)
  }

  handleUnitChange(event){
    const tfs = document.getElementsByClassName(this.props.item._id)
    let sum = Big(0);
    for (var i = 0; i < tfs.length; i++) {
      let value = tfs[i].getElementsByTagName("INPUT")[0].value;
      value = value.length > 0 ? value : 0;
      sum = sum.plus(value)
    }

    const newQuantity = Number(sum.toString())
    this.calculateOldNew(newQuantity, this.state.unitPrice, this.state.taxRate);
    this.setState({quantity: newQuantity })
  }

  handleChange(event){
    let det = document.getElementById(`${this.props.item._id}`)
    let inputs = det.getElementsByTagName('INPUT')

    let unitP = 0;
    let taxR = 0;
    let quantity = 0;
    for (var i = 0; i < inputs.length; i++) {
      if(inputs[i].name === 'unit_price')
        unitP = Number(inputs[i].value);

      if(inputs[i].name === 'tax_rate')
        taxR = Number(inputs[i].value);

      if(inputs[i].name === 'quantity')
        quantity = Number(inputs[i].value);
    }

    this.calculateOldNew(quantity, unitP, taxR)
    this.setState({unitPrice: unitP, taxRate: taxR, quantity: quantity})
  }

  calculateOldNew(newQuantity, newUnitP, newTaxR){
    let previousAmounts = {}
    let qu = Number(Big(this.state.unitPrice).times(this.state.quantity).toString())
    tax = Number(Big(this.state.taxRate).div(100).times(qu).toString())
    previousAmounts.subTotal = Number(Big(qu).plus(tax).toString())

    let newAmounts = {}
    let nqu = Number(Big(newUnitP).times(newQuantity).toString())
    ntax = Number(Big(newTaxR).div(100).times(nqu).toString())
    newAmounts.subTotal = Number(Big(nqu).plus(ntax).toString())
    this.props.onRequestQuantity(previousAmounts, newAmounts)
  }



  render(){

    const unitList = this.props.item.units.map( (unit) =>
      <UnitDetail
        key={unit.unitID}
        unit={unit}
        itemID={this.props.item._id}
        onRequestChange={this.handleUnitChange}/>
    )

    return(
      <div className='row row-item' ref='row'>
        <div className='col-xs-12'>
          <div className='selector-item product-item'>

            <IconButton className='remove-b' onTouchTap={this.onRemove}>
              <ContentRemoveCircle className='remove'/>
            </IconButton>

            <AutoComplete
                name="name"
                type="text"
                style={{marginTop: '-18px'}}
                filter={AutoComplete.caseInsensitiveFilter}
                maxSearchResults={5}
                hintText=""
                searchText={this.props.item.name}
                floatingLabelFixed={true}
                floatingLabelText="Item Name"
                fullWidth={true}
                dataSource={dataS}/>

            <ItemDetail
              id={this.props.item._id}
              handleChange={this.handleChange}
              hasUnits={this.props.item.units.length > 0}
              unitPrice={this.state.unitPrice}
              taxRate={this.state.taxRate}
              quantity={this.state.quantity}/>

            <SelectorButton
              title="Sectors"
              style={{marginTop: '15px'}}
              highlight={this.props.item.units.length > 0}
              toggleSelector={this.props.toggleSelector}/>

            {unitList}

          </div>
        </div>
      </div>
    )
  }
}

const UnitDetail = (props) => {

  return(
    <div className='pi-detail'>
      <div className='pi-info'>
        <span>For Sector</span>
        {props.unit.unit.name}
      </div>

      <TextField
          name="amount_taken"
          type="number"
          className={`quantity-input ${props.itemID}`}
          hintText=""
          floatingLabelText="Quantity"
          onChange={props.onRequestChange}
          defaultValue={props.unit.quantity}
          fullWidth={false}/>
    </div>
  )
}


const ItemDetail = (props) => {

  let subTotal = props.unitPrice * props.quantity
  subTotal = subTotal * (1 + (props.taxRate / 100))
  let tfprops = {}
  if(props.hasUnits){
    tfprops.disabled = true;
    tfprops.value = props.quantity
  }else{
    tfprops.disabled = false;
    tfprops.defaultValue = props.quantity
  }

  return(
    <div id={props.id} className='pi-detail'>

      <MTextField
        name="unit_price"
        type="number"
        hintText=""
        boxClass="quantity-input"
        floatingLabelText="Unit Price"
        onChange={props.handleChange}
        prefix="$"
        prefixSide="left"
        defaultValue={props.unitPrice.toFixed(2)}
        fullWidth={true}/>

      <MTextField
        name="tax_rate"
        type="number"
        hintText=""
        boxClass="quantity-input"
        floatingLabelText="Tax Rate"
        onChange={props.handleChange}
        prefix="%"
        prefixSide="right"
        defaultValue={props.taxRate.toFixed(0)}
        fullWidth={true}/>

      <TextField
          name="quantity"
          type="number"
          hintText=""
          onChange={props.handleChange}
          className="quantity-input"
          floatingLabelText="Quantity"
          {...tfprops}
          fullWidth={false}/>

      <div className='pi-info' >
        <span>Sub Total</span>
        ${subTotal.toFixed(2)}
      </div>


    </div>
  )
}

// <div className='row'>
//   <div className='col-xs-12'>
//     <SelectorButton title="Sectors" highlight={this.props.expense.unit} toggleSelector={this.props.toggleUnitSelector}/>
//   </div>
// </div>
//
// {this.props.expense.unit &&
//   <UnitSelected unit={this.props.expense.unit}/>
// }
