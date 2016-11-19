import React from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';





export default class ProductSellItem extends React.Component{

  constructor(props){
    super(props);
    this.handleExpand = this.handleExpand.bind(this);
    this.state = {quantity:  Math.floor(Math.random() * 20) + 1}
  }

  handleExpand(event){

  }

  render(){
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <div className='selector-item'>
            <div className='select-title'>
              <Avatar className="img-div" backgroundColor={this.props.backgroundColor} style={{marginRight: '15px', padding: '1px 0 0 1px'}} size={56}>P</Avatar>
              <h3>
                Product Name
                <span>KJSD-122L-12</span>
              </h3>

              <div className='quantity-amount'>
                <span></span>
                {this.state.quantity}
              </div>


              <IconButton className="expand-detail" onTouchTap={this.handleExpand}>
                <NavigationExpandLess/>
              </IconButton>
            </div>

            <div className='expandable-div'>
              <div className='product-detail'>

                <div className='product-info'>
                  <span>Unit Price</span>
                  $4.89
                </div>

                <div className='product-info'>
                  <span>Tax Rate</span>
                  16%
                </div>

                <div className='product-info' >
                  <span>Sub Total</span>
                  $12.12
                </div>

                <TextField
                    name="quantity"
                    type="number"
                    hintText=""
                    className="quantity-input"
                    floatingLabelText="Quantity"
                    defaultValue={this.state.quantity}
                    fullWidth={false}/>
              </div>

              <div className='pinventories'>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
