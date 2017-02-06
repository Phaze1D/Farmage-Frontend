import React from "react"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import StorageSVG from 'material-ui/svg-icons/device/storage';
import ReactDOM from 'react-dom';
import MSelectSort from '../../../structure/mselect_sort/MSelectSort';

import faker from 'faker'


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class UnitsFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      svalue: 0, yvalue: 0, tvalue: 0,
      cmin: null, umin: null
    }

    this.sortHandleChange = this.sortHandleChange.bind(this)
    this.yieldHandleChange = this.yieldHandleChange.bind(this);
    this.trackHandleChange = this.trackHandleChange.bind(this);

  }

  trackHandleChange(event, index, value){
    this.setState({tvalue: value});
  }

  sortHandleChange(event, index, value){
    this.setState({svalue: value});
  }

  yieldHandleChange(event, index, value){
    this.setState({yvalue: value});
  }

  render(){

    const itemsArray = [
      {primaryText: "Sector Name", value: 0},
      {primaryText: "Active Amount", value: 1},
      {primaryText: "Active Sub Sectors", value: 2},
      {primaryText: "Parent Sector", value: 3},
      {primaryText: "Created At", value: 4},
      {primaryText: "Updated At", value: 5}
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
          value={this.state.yvalue}
          onChange={this.yieldHandleChange}
          floatingLabelText="Has Yields"
          fullWidth={false}
          autoWidth={true}>

            <MenuItem key={0} value={0} primaryText='All' />
            <MenuItem key={1} value={1} primaryText='Yes' />
            <MenuItem key={2} value={2} primaryText='No' />

          </SelectField>
        </div>

        <div className='mselect-field'>
          <SelectField
          value={this.state.tvalue}
          onChange={this.trackHandleChange}
          floatingLabelText="Is Trackable"
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


        <Subheader className='filter-header'></Subheader>
        <div className='mselect-field'>
          <RaisedButton label="Export" primary={true} fullWidth={true} icon={<StorageSVG className='raised-bsvg' />}/>
        </div>
        <Subheader className='filter-header'></Subheader>

      </div>
    )
  }

}
