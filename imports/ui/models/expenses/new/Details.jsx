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



const dataS = ["Sheep Food", 'Chicken Food', "Dog Food", "Employee Salary", "Gasoline", "LightBulb", "Some Very Long Item To Check Phone Handling"]

export default class Details extends React.Component{
  constructor(props){
    super(props);
    this.state = {items: this.props.items};

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
    this.state = {quantity: 0}

    this.onRemove = this.onRemove.bind(this)
  }

  componentDidMount() {
    this.refs.row.style.height = this.refs.row.getElementsByClassName('col-xs-12')[0].clientHeight + "px"
    setTimeout(() => {
      this.refs.row.style.height = 'auto'
    }, 500)
  }

  onRemove(event){
    this.refs.row.style.height = this.refs.row.getElementsByClassName('col-xs-12')[0].clientHeight + "px"

    setTimeout(() => {
      this.refs.row.style.height = '0px'
    }, 150)

    setTimeout(() => {this.props.onRemoveCall()}, 700)
  }

  render(){

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

            <ItemDetail item={this.props.item} quantity={this.state.quantity}/>

            <SelectorButton
              title="Sectors"
              style={{marginTop: '15px'}}
              highlight={this.props.item.units.length > 0}
              toggleSelector={this.props.toggleSelector}/>

          </div>
        </div>
      </div>
    )
  }
}


const ItemDetail = (props) => {

  let subTotal = props.item.unitPrice * props.quantity
  subTotal = subTotal * (1 + (props.item.taxRate / 100))

  let tfprops = {}
  if(props.item.units.length > 0){
    tfprops.disabled = true;
    tfprops.value = props.quantity
  }else{
    tfprops.disabled = false;
    tfprops.defaultValue = props.quantity
  }

  return(
    <div className='pi-detail'>

      <MTextField
        name="unit_price"
        type="number"
        hintText=""
        boxClass="quantity-input"
        floatingLabelText="Unit Price"
        prefix="$"
        prefixSide="left"
        defaultValue={props.item.unitPrice.toFixed(2)}
        fullWidth={true}/>

      <MTextField
        name="tax_rate"
        type="number"
        hintText=""
        boxClass="quantity-input"
        floatingLabelText="Tax Rate"
        prefix="%"
        prefixSide="right"
        defaultValue={props.item.taxRate.toFixed(2)}
        fullWidth={true}/>

      <TextField
          name="quantity"
          type="number"
          hintText=""
          onChange={props.handleQuantityChange}
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
