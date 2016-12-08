import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factoryExpense} from '../faker/factoryExpense.js';
import ExpenseCard from '../card/ExpenseCard';


export default class ExpensesIndex extends React.Component{
  constructor(props){
    super(props);
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
        <ExpenseCard {...expense} />
      </div>
    );

    return (
      <ReactCSSTransitionGroup
        transitionName={ {
          enter: 'enter-index',
          leave: 'leave-index',
          appear: 'appear-index'
        } }
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
        transitionAppear={true}
        transitionAppearTimeout={400}>

        <div key='expenses-index' className='row is-flex'>
          {listItems}
        </div>

      </ReactCSSTransitionGroup>

    );
  }
}
