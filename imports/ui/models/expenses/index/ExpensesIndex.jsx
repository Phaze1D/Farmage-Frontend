import React from 'react';
import {factoryExpense} from '../faker/factoryExpense.js';
import ExpenseCard from '../card/ExpenseCard';
import ExpensesNew from '../new/ExpensesNew';
import ExpensesFilter from '../filter/ExpensesFilter';
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';



export default class ExpensesIndex extends React.Component{
  constructor(props){
    super(props);
    this.onCardUpdate = this.onCardUpdate.bind(this);
  }

  onCardUpdate(expense_id){
    this.refs.dashboard.toggleRight(expense_id, 'Update Expense');
  }


  render(){
    let expenses = [];

    for(let i = 0; i < 20; i++){
        expenses.push(factoryExpense());
    }

    expenses.sort((a, b) => {
      return  a.createdAt - b.createdAt;
    });

    const listItems = expenses.map((expense) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={expense._id}>
        <ExpenseCard {...expense} onRequestUpdate={this.onCardUpdate}/>
      </div>
    );

    const right = <ExpensesNew/>;
    const filter = <ExpensesFilter/>;

    return (
      <Dashboard
        defaultRightTitle='New Expense'
        headerTitle='Expenses'
        showMFAB={true}
        right={right}
        filter={filter}
        ref='dashboard'
        key='main-dash'>

        <MVirtualGrid>
          {listItems}
        </MVirtualGrid>

      </Dashboard>

    );
  }
}
