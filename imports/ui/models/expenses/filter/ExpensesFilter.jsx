import React from "react"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import ReactDOM from 'react-dom';
import MSelectSort from '../../../structure/mselect_sort/MSelectSort';

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ExpensesFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      svalue: 5, rvalue: 0,
      cmin: null, umin: null
    }

    this.sortHandleChange = this.sortHandleChange.bind(this);
    this.receiptHandleChange = this.receiptHandleChange.bind(this);
  }

  sortHandleChange(event, index, value){
    this.setState({svalue: value});
  }

  receiptHandleChange(event, index,value){
    this.setState({rvalue: value});
  }


  render(){

    const itemsArray = [
      {primaryText: "Item Name", value: 0},
      {primaryText: "Total Cost", value: 1},
      {primaryText: "Quantity", value: 2},
      {primaryText: "Provider", value: 3},
      {primaryText: "Unit", value: 4},
      {primaryText: "Created Date", value: 5},
      {primaryText: "Updated Date", value: 6}
    ]

    return(
      <div className='mfilter-content' ref='mfilterContent'>

        <MSelectSort
        value={this.state.svalue}
        onSelected={this.sortHandleChange}
        floatingLabelText="Sort By"
        fullWidth={false}
        autoWidth={true}
        initIndex={5}
        itemsArray={itemsArray}/>

        <div className='mselect-field'>
          <SelectField
          value={this.state.rvalue}
          onChange={this.receiptHandleChange}
          floatingLabelText="Has Receipt"
          fullWidth={false}
          autoWidth={true}>

            <MenuItem key={0} value={0} primaryText='All' />
            <MenuItem key={1} value={1} primaryText='Yes' />
            <MenuItem key={2} value={2} primaryText='No' />

          </SelectField>
        </div>

        <Subheader className='filter-header'>Created Date</Subheader>
        <DatePicker
          className='mselect-field'
          name="created_from"
          hintText="From"
          fullWidth={false}
          onChange={ (event, date) => {this.setState({cmin: date}) } }
          formatDate={new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format} />

        <DatePicker
          className='mselect-field'
          name="created_to"
          hintText="To"
          fullWidth={false}
          minDate={this.state.cmin}
          disabled={this.state.cmin === null}
          formatDate={new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format} />

        <Subheader className='filter-header'>Updated Date</Subheader>
        <DatePicker
          className='mselect-field'
          name="created_from"
          hintText="From"
          fullWidth={false}
          onChange={ (event, date) => {this.setState({umin: date}) } }
          formatDate={new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format} />

        <DatePicker
          className='mselect-field'
          name="created_to"
          hintText="To"
          fullWidth={false}
          minDate={this.state.umin}
          disabled={this.state.umin === null}
          formatDate={new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format} />


      </div>

    )
  }

}
