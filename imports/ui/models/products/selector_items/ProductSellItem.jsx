import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import SelectorButton from '../../../structure/selector_button/SelectorButton';
import InventorySelected from '../../inventories/selector_items/InventorySelected';
import MAvatar from '../../../structure/mavatar/MAvatar';
import classnames from 'classnames';
import Big from 'big.js';
Big.DP = 10


const PADDING_BORDER = 42;

export default class ProductSellItem extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      itemHeight: '',
      quantity:  this.props.detail.quantity,
      show: true
    }

    this.handleExpand = this.handleExpand.bind(this);
    this.handleInventoryChange = this.handleInventoryChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.calculateOldNew = this.calculateOldNew.bind(this);
  }

  componentDidMount(){
  }

  handleInventoryChange(event){
    const tfs = document.getElementsByClassName(this.props.detail.productID)
    let sum = Big(0);
    for (var i = 0; i < tfs.length; i++) {
      let value = tfs[i].getElementsByTagName("INPUT")[0].value;
      value = value.length > 0 ? value : 0;
      sum = sum.plus(value)
    }

    const newQuantity = Number(sum.toString())
    this.calculateOldNew(newQuantity);
    this.setState({quantity: newQuantity })
  }

  handleQuantityChange(event, newQuantity){
    newQuantity = newQuantity.length > 0 ? newQuantity : 0;
    this.calculateOldNew(newQuantity);
    this.setState({quantity: newQuantity})
  }


  handleExpand(event){
    event.stopPropagation();
    if(this.state.show){
      const mheight = this.titleRef.clientHeight + this.expandRef.clientHeight + PADDING_BORDER;
      this.setState({show: false})
      this.setState({itemHeight: mheight + 'px'})

      setTimeout( () => {
        const height = this.titleRef.clientHeight + PADDING_BORDER;
        this.setState({itemHeight: height + 'px'})
      }, 100)

    }else{
      const height = this.titleRef.clientHeight + this.expandRef.clientHeight + PADDING_BORDER;
      this.setState({show: true})
      this.setState({itemHeight: height + 'px'})
      setTimeout( () => { this.setState({itemHeight: ''}) }, 500)
    }
  }

  calculateOldNew(newQuantity){
    let previousAmounts = {}
    previousAmounts.subTotal = Number(Big(this.props.detail.unitPrice).times(this.state.quantity).toString()),
    previousAmounts.taxTotal = Number(Big(this.props.detail.taxRate).div(100).times(previousAmounts.subTotal).toString())
    previousAmounts.total = Number(Big(previousAmounts.subTotal).plus(previousAmounts.taxTotal))

    let newAmounts = {}
    newAmounts.subTotal = Number(Big(this.props.detail.unitPrice).times(newQuantity).toString()),
    newAmounts.taxTotal = Number(Big(this.props.detail.taxRate).div(100).times(newAmounts.subTotal).toString())
    newAmounts.total = Number(Big(newAmounts.subTotal).plus(newAmounts.taxTotal))

    this.props.onRequestQuantity(previousAmounts, newAmounts)
  }


  render(){
    const butClass = classnames('expand-button', {'rotate': this.state.show});
    const styleH = {height: this.state.itemHeight};
    const product = this.props.detail.product;
    const char = this.props.detail.productName.toUpperCase().charAt(0);

    const inventoryList = this.props.detail.inventories.map((dinventory) =>
      <InventorySelected
        onRequestChange={this.handleInventoryChange}
        key={dinventory.inventoryID}
        productID={this.props.detail.productID}
        dinventory={dinventory}/>
    )

    return (
      <div className='row'>
        <div className='col-xs-12'>
          <div className='selector-item product-item' style={styleH}>
            <div className='select-title clickable' onTouchTap={this.handleExpand} ref={(target) => {this.titleRef = target}}>
              <MAvatar className='img-div'
                style={{marginRight: '15px', padding: '1px 0 0 1px'}}
                size={56} cha={char} src={product.imageUrl}/>


              <h3>
                {this.props.detail.productName}
                <span>{product.sku}</span>
              </h3>

              <div className='quantity-amount'>
                <span></span>
                {this.state.quantity}
              </div>


              <IconButton className={butClass} onTouchTap={this.handleExpand}>
                <NavigationExpandMore/>
              </IconButton>
            </div>

            <div className='expandable-div' ref={(target) => {this.expandRef = target}}>

              <ProductDetail
                handleQuantityChange={this.handleQuantityChange}
                quantity={this.state.quantity}
                detail={this.props.detail}/>

              <SelectorButton
                title="Inventories"
                highlight={inventoryList.length > 0}
                toggleSelector={this.props.toggleInventorySelector}/>

              {inventoryList}

            </div>
          </div>
        </div>
      </div>
    )
  }
}


const ProductDetail = (props) => {

  let subTotal = props.detail.unitPrice * (1 + (props.detail.taxRate / 100))
  subTotal *= props.quantity

  let tfprops = {}
  if(props.detail.inventories.length > 0){
    tfprops.disabled = true;
    tfprops.value = props.quantity
  }else{
    tfprops.disabled = false;
    tfprops.defaultValue = props.quantity
  }

  return(
    <div className='pi-detail'>

      <div className='pi-info'>
        <span>Unit Price</span>
        ${props.detail.unitPrice.toFixed(2)}
      </div>

      <div className='pi-info'>
        <span>Tax Rate</span>
        {props.detail.taxRate}%
      </div>

      <div className='pi-info' >
        <span>Sub Total</span>
        ${subTotal.toFixed(2)}
      </div>

      <TextField
          name="quantity"
          type="number"
          hintText=""
          onChange={props.handleQuantityChange}
          className="quantity-input"
          floatingLabelText="Quantity"
          {...tfprops}
          fullWidth={false}/>
    </div>
  )
}
