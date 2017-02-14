import React from 'react';
import ActionReceipt from 'material-ui/svg-icons/action/receipt';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import MAvatar from '../../../structure/mavatar/MAvatar';
import UserShowInfo from '../../ousers/UserShowInfo';
import MFade from '../../../structure/mfade/MFade';
import ExpandDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import classnames from 'classnames'



import {factoryExpenseR} from '../faker/factoryExpense';


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ExpenseShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleSwipe = this.handleSwipe.bind(this);


    this.expense = factoryExpenseR();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
    if(this.refs.mshow && value !== 0){
      this.refs.mshow.hideFAB()
    }else if (this.refs.mshow && value === 0) {
      this.refs.mshow.showFAB()
    }
  }

  handleSwipe(value, indexLatest){
    this.setState({tabValue: value})
    if(this.refs.mshow && value !== 0){
      this.refs.mshow.hideFAB()
    }else if (this.refs.mshow && value === 0) {
      this.refs.mshow.showFAB()
    }
  }

  render(){

    return(
      <MShow
        ref='mshow'
        onFabClick={this.props.onFabClick}
        title={this.expense.customRef}
        hasFAB={true}
        hasAvatar={true}
        avatarIcon={<ActionReceipt/>}
        avatarURL={null}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary']}/>

        <MFade>
          <SwipeableViews onChangeIndex={this.handleSwipe} index={this.state.tabValue} animateHeight={false}>
            <ExpenseSummary expense={this.expense}/>
            <div>Tables</div>
            <div>Analytics</div>
          </SwipeableViews>
        </MFade>

      </MShow>
    )
  }
}

let ExpenseSummary = (props) => {

  let {
    expense
  } = props

  let notClas = 'mtab-info text-wrap';
  let notes = expense.notes;

  if( !(notes && notes.length > 0) ){
    notes = 'Empty'
    notClas = 'mtab-info none'
  }

  let itemList = expense.items.map( (item) =>
    <Detail key={item._id} item={item}/>
  )


  return(
    <div className='mtab-content'>
      <h3>Expense Information</h3>

      <div className='mtab-show-flex'>

        <div className='mtab-content-card'>
          <div className='mtab-info'>
            <span>Reference ID</span>
            {expense.customRef}
          </div>


          <div className='mtab-info'>
            <span>Date Bought</span>
            {new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(expense.dateBought)}
          </div>


          {expense.provider ?
            <div className='cyield-info-flex' style={{padding: '0 0 16px'}}>
              <span style={{fontSize: '13px'}}>Provider</span>
              <MAvatar className='cyield-img'
                style={{marginRight: '15px', padding: '1px 0 0 0px'}}
                size={48} cha={expense.provider.firstName.toUpperCase().charAt(0)} src={expense.provider.avatarURL}/>

              <div>
                {expense.provider.firstName} {expense.provider.lastName}
                <span>
                  {expense.provider.company}
                </span>
              </div>

            </div>
            :
            <div className='mtab-info none'>
              <span>Provider</span>
                Empty
            </div>
          }

        </div>

        <div className='mtab-content-card'>

          <div className='mtab-info'>
            <span>Sub Total</span>
            ${expense.subTotal.toFixed(2)}
          </div>

          <div className='mtab-info'>
            <span>Extra Costs or Discounts</span>
            ${expense.extra.toFixed(2)}
          </div>

          <div className='mtab-info'>
            <span>Total Cost</span>
            ${expense.totalPrice.toFixed(2)}
          </div>

        </div>

        <div className='mtab-content-card'>
          <div className={notClas}>
            <span>Description</span>
            {notes}
          </div>
        </div>

      </div>

      <h3 style={{marginTop: '25px'}}>Items</h3>
      <div className='mtab-show-flex'>
        {itemList}
      </div>


      <h3 style={{marginTop: '25px'}}>User Information</h3>

      <div className='mtab-show-flex'>
        <UserShowInfo user={expense.createdBy} subTitle='Created' date={expense.createdAt}/>
        <UserShowInfo user={expense.updatedBy} subTitle='Updated' date={expense.updatedAt}/>
      </div>

    </div>
  )
}


class Detail extends React.Component{
  constructor(props){
    super(props)
    this.state = {expanded: false}
    this.exHeight = 0;
    this.handleExpand = this.handleExpand.bind(this);
  }

  componentDidMount(){
    // this.refs.card.style.height = this.refs.card.clientHeight + 'px'
  }

  handleExpand(event){
    let list = this.refs.expandable.getElementsByClassName('mtab-info-flex')
    this.exHeight = list[0].clientHeight * list.length

    // if(this.state.expanded){
    //   setTimeout(() => {
    //     this.refs.card.style.height = this.refs.card.clientHeight + 'px'
    //   }, 500)
    //
    // }else{
    //   this.refs.card.style.height = 'auto'
    // }

    this.setState({expanded: !this.state.expanded})
  }

  render(){
    const expClasses = classnames('expandable', {'expanded' : this.state.expanded})
    const subClasses = classnames('sell-show-subtitle', {'expanded' : this.state.expanded})

    const unitList = this.props.item.units.map( (unit) =>
      <Unit key={unit.unitID} unit={unit} />
    )

    return(
      <div ref='card' className='mtab-content-card' style={{alignSelf: 'flex-start'}}>

        <div className='cyield-info-flex' style={{padding: '0 0 16px'}}>
          <div className='e-overflow' style={{flexGrow: '1'}}>
            <div className='e-overflow'>
              {this.props.item.name}
            </div>
          </div>



        <div className='mtab-product-info'>
          <div className='mtab-info'>
            <span>Unit Price</span>
            ${this.props.item.unitPrice}
          </div>

          <div className='mtab-info'>
            <span>Tax Rate</span>
            {this.props.item.taxRate}%
          </div>

          <div className='mtab-info'>
            <span>Quantity</span>
            {this.props.item.quantity}
          </div>

          <div className='mtab-info'>
            <span>Sub Total</span>
            ${((this.props.item.unitPrice*this.props.item.quantity) * (1 + (this.props.item.taxRate/100))).toFixed(2)}
          </div>
        </div>

        </div>

        <div className={subClasses}
          onTouchTap={this.handleExpand}>
          <ExpandDown/>
          Sectors
        </div>

        <div ref='expandable' className={expClasses} style={{height: this.state.expanded ? this.exHeight : '0px'}}>
          {unitList.length > 0 ? unitList:
            <div className='mtab-info-flex none'>
              None
            </div>
          }
        </div>
      </div>
    )
  }
}


let Unit = (props) => {

  let identifer = props.unit.unit.name

  return(
    <div className='mtab-info-flex'>
      <div className='mtab-info'>
        <span>For Sector</span>
        {identifer}
      </div>

      <div className='mtab-info'>
        <span>Quantity</span>
        {props.unit.quantity}
      </div>

      <div className='mtab-info'>
      </div>
    </div>
  )
}
