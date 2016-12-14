import React from "react"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import ReactDOM from 'react-dom';
import MSelectSort from '../../../structure/mselect_sort/MSelectSort';

import faker from 'faker'


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class MovementsFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      svalue: 2, tvalue: 0, mvalue: 0,
      cmin: null, umin: null
    }

    this.sortHandleChange = this.sortHandleChange.bind(this)
    this.typeHandleChange = this.typeHandleChange.bind(this);
    this.manualHandleChange = this.manualHandleChange.bind(this);

  }

  manualHandleChange(event, index, value){
    this.setState({mvalue: value});
  }

  sortHandleChange(event, index, value){
    this.setState({svalue: value});
  }

  typeHandleChange(event, index, value){
    this.setState({tvalue: value});
  }

  render(){

    const itemsArray = [
      {primaryText: "Identifer", value: 0},
      {primaryText: "Amount", value: 1},
      {primaryText: "Created Date", value: 2},
      {primaryText: "Updated Date", value: 3}
    ]

    return(
      <div className='mfilter-content' ref='mfilterContent'>

        <MSelectSort
        value={this.state.svalue}
        onSelected={this.sortHandleChange}
        floatingLabelText="Sort By"
        fullWidth={false}
        autoWidth={true}
        initIndex={2}
        itemsArray={itemsArray}/>

        <div className='mselect-field'>
          <SelectField
          value={this.state.tvalue}
          onChange={this.typeHandleChange}
          floatingLabelText="By Type"
          fullWidth={false}
          autoWidth={true}>

            <MenuItem key={0} value={0} primaryText='All' />
            <MenuItem key={1} value={1} primaryText='Inventory' />
            <MenuItem key={2} value={2} primaryText='Yield' />
            <MenuItem key={3} value={2} primaryText='Unit' />


          </SelectField>
        </div>

        <div className='mselect-field'>
          <SelectField
          value={this.state.mvalue}
          onChange={this.manualHandleChange}
          floatingLabelText="Is Manual"
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
