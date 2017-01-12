import React from 'react';
import ActionReceipt from 'material-ui/svg-icons/action/receipt';

import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';

import {factoryExpense} from '../faker/factoryExpense';


export default class ExpenseShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this)

    this.expense = factoryExpense();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
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

      </MShow>
    )
  }
}
