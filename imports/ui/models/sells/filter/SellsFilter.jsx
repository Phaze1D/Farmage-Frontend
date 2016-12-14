import React from "react"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import ReactDOM from 'react-dom';
import MSelectSort from '../../../structure/mselect_sort/MSelectSort';

import faker from 'faker'


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class SellsFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      svalue: 4, stvalue: 0, pvalue: 0,
      cmin: null, umin: null, pmin: null
    }

    this.sortHandleChange = this.sortHandleChange.bind(this)
    this.statusHandleChange = this.statusHandleChange.bind(this);
    this.paidHandleChange = this.paidHandleChange.bind(this);

    this.testStatus = ['All']
    for (var i = 0; i < 5; i++) {
      this.testStatus.push(faker.random.word())
    }
  }

  paidHandleChange(event, index, value){
    this.setState({pvalue: value});
  }

  sortHandleChange(event, index, value){
    this.setState({svalue: value});
  }

  statusHandleChange(event, index, value){
    this.setState({stvalue: value});
  }

  render(){

    const statusArray = this.testStatus.map((status, index) =>
      <MenuItem key={index} value={index} primaryText={status} />
    )

    const itemsArray = [
      {primaryText: "Reference ID", value: 0},
      {primaryText: "Total Price", value: 1},
      {primaryText: "Paid At", value: 2},
      {primaryText: "Customer", value: 3},
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
        initIndex={4}
        itemsArray={itemsArray}/>

        <div className='mselect-field'>
          <SelectField
          value={this.state.stvalue}
          onChange={this.statusHandleChange}
          floatingLabelText="By Status"
          fullWidth={false}
          autoWidth={true}>

            {statusArray}

          </SelectField>
        </div>

        <div className='mselect-field'>
          <SelectField
          value={this.state.pvalue}
          onChange={this.paidHandleChange}
          floatingLabelText="Is Paid"
          fullWidth={false}
          autoWidth={true}>

            <MenuItem key={0} value={0} primaryText='All' />
            <MenuItem key={1} value={1} primaryText='Yes' />
            <MenuItem key={2} value={2} primaryText='No' />

          </SelectField>
        </div>

        <Subheader className='filter-header'>Paid Date</Subheader>
        <DatePicker
          className='mselect-field'
          name="created_from"
          hintText="From"
          fullWidth={false}
          onChange={ (event, date) => {this.setState({pmin: date}) } }
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
          minDate={this.state.pmin}
          disabled={this.state.pmin === null}
          formatDate={new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format} />


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
