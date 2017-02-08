import React from 'react'
import Portal from 'react-portal';
import {Random} from 'meteor/random';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';


import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import UnitSelected from '../../units/selector_items/UnitSelected';
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

    const newItems = this.state.items.concat([{_id: Random.id()}]);
    this.setState({items: newItems});
  }

  handleRemoveTouch(i){
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }


  render() {

    const items = this.state.items.map((item, i) => (
      <Item key={item._id} item={item}  onRemoveCall={() => this.handleRemoveTouch(i)} />
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

  }

  componentDidMount() {
    this.refs.row.style.height = this.refs.row.getElementsByClassName('col-xs-12')[0].clientHeight + "px"
  }

  onRemove(event){
    this.refs.row.style.height = '0px'
  }

  render(){

    return(
      <div className='row row-item' ref='row'>
        <div className='col-xs-12'>
          <div className='selector-item product-item' style={{height: '100px'}}>

            <h3>
              {this.props.item.productName}
            </h3>

            <div className='quantity-amount'>
              <span></span>
              {this.state.quantity}
            </div>

          </div>
        </div>
      </div>
    )
  }
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
