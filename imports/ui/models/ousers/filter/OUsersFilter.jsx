import React from "react"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import ReactDOM from 'react-dom';
import MSelectSort from '../../../structure/mselect_sort/MSelectSort';

import faker from 'faker'


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class OUsersFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      svalue: 0, pvalue: 0,
      cmin: null
    }

    this.sortHandleChange = this.sortHandleChange.bind(this)
    this.permissionHandleChange = this.permissionHandleChange.bind(this);

  }

  sortHandleChange(event, index, value){
    this.setState({svalue: value});
  }

  permissionHandleChange(event, index, value){
    this.setState({pvalue: value});
  }

  render(){

    const itemsArray = [
      {primaryText: "First Name", value: 0},
      {primaryText: "Last Name", value: 1},
      {primaryText: "Email", value: 2},
      {primaryText: "Invited At", value: 3},
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

        <div className='mselect-field'>
          <SelectField
          value={this.state.pvalue}
          onChange={this.permissionHandleChange}
          floatingLabelText="By Permission"
          fullWidth={false}
          autoWidth={true}>

            <MenuItem value={0} primaryText='All' />
            <MenuItem value={1} primaryText='Owner' />
            <MenuItem value={2} primaryText='Viewer' />
            <MenuItem value={3} primaryText='Sales Manager' />
            <MenuItem value={4} primaryText='Sector Manager' />
            <MenuItem value={5} primaryText='Expenses Manager' />
            <MenuItem value={6} primaryText='Batches Manager' />
            <MenuItem value={7} primaryText='Users Manager' />

          </SelectField>
        </div>

        <Subheader className='filter-header'>Invited Date</Subheader>
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

      </div>
    )
  }

}
