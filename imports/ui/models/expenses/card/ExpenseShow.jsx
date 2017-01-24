import React from 'react';
import ActionReceipt from 'material-ui/svg-icons/action/receipt';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import MAvatar from '../../../structure/mavatar/MAvatar';
import UserShowInfo from '../../ousers/UserShowInfo';


import {factoryExpense} from '../faker/factoryExpense';


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ExpenseShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleSwipe = this.handleSwipe.bind(this);


    this.expense = factoryExpense();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  handleSwipe(index, indexLatest){
    this.setState({tabValue: index})
  }

  render(){

    return(
      <MShow
        onFabClick={this.props.onFabClick}
        title={`${this.expense.quantity} ${this.expense.itemName}`}
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

        <SwipeableViews onChangeIndex={this.handleSwipe} index={this.state.tabValue} animateHeight={false}>
          <ExpenseSummary expense={this.expense}/>
          <div>Reports</div>
          <div>Analytics</div>
        </SwipeableViews>

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


  return(
    <div className='mtab-content'>
      <h3>Expense Information</h3>

      <div className='mtab-show-flex'>

        <div className='mtab-content-card'>
          <div className='mtab-info'>
            <span>Item Name</span>
            {expense.itemName}
          </div>


          <div className='mtab-info'>
            <span>Date Bought</span>
            {new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(expense.dateBought)}
          </div>

        </div>

        <div className='mtab-content-card flex-column'>

          <div className='mtab-info'>
            <span>Unit Cost</span>
            ${expense.unitPrice}
          </div>

          <div className='mtab-info'>
            <span>Tax Rate</span>
            {expense.taxRate}%
          </div>

          <div className='mtab-info'>
            <span>Quantity</span>
            {expense.quantity}
          </div>

          <div className='mtab-info'>
            <span>Total Cost</span>
            ${((expense.quantity * expense.unitPrice) * (1 + (expense.taxRate/100))).toFixed(2)}
          </div>

        </div>

        <div className='mtab-content-card'>
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

          <div className='mtab-info'>
            <span>For Unit</span>
              {expense.unit.name}
          </div>
        </div>

        <div className='mtab-content-card'>
          <div className={notClas}>
            <span>Description</span>
            {notes}
          </div>
        </div>

      </div>

      <h3 style={{marginTop: '25px'}}>User Information</h3>

      <div className='mtab-show-flex'>
        <UserShowInfo user={expense.createdBy} subTitle='Created' date={expense.createdAt}/>
        <UserShowInfo user={expense.updatedBy} subTitle='Updated' date={expense.updatedAt}/>
      </div>

    </div>
  )
}
