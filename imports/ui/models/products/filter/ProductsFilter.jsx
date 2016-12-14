import React from "react"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import ReactDOM from 'react-dom';
import MSelectSort from '../../../structure/mselect_sort/MSelectSort';

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ProductsFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      svalue: 0,
      cmin: null, umin: null
    }

    this.sortHandleChange = this.sortHandleChange.bind(this);
  }

  sortHandleChange(event, index, value){
    this.setState({svalue: value});
  }


  render(){

    const itemsArray = [
      {primaryText: "Product Name", value: 0},
      {primaryText: "SKU", value: 1},
      {primaryText: "Total Price", value: 2},
      {primaryText: "Stock", value: 3},
      {primaryText: "Created Date", value: 4},
      {primaryText: "Updated Date", value: 5}
    ]

    return(
      <div className='mfilter-content' ref='mfilterContent'>

        <MSelectSort
        value={this.state.svalue}
        onSelected={this.sortHandleChange}
        floatingLabelText="Sort By"
        fullWidth={false}
        autoWidth={true}
        initIndex={0}
        itemsArray={itemsArray}/>

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
