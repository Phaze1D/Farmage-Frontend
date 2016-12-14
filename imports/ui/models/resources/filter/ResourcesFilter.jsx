import React from "react"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import ReactDOM from 'react-dom';
import MSelectSort from '../../../structure/mselect_sort/MSelectSort';

import faker from 'faker'


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ResourcesFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      svalue: 0, mvalue: 0,
      cmin: null, umin: null
    }

    this.sortHandleChange = this.sortHandleChange.bind(this)
    this.measurementHandleChange = this.measurementHandleChange.bind(this);

    this.testMeasurement = ['All']
    for (var i = 0; i < 5; i++) {
      this.testMeasurement.push(faker.lorem.word())
    }
  }


  sortHandleChange(event, index, value){
    this.setState({svalue: value});
  }

  measurementHandleChange(event, index, value){
    this.setState({mvalue: value});
  }

  render(){

    const measurementArray = this.testMeasurement.map((status, index) =>
      <MenuItem key={index} value={index} primaryText={status} />
    )

    const itemsArray = [
      {primaryText: "Resource Name", value: 0},
      {primaryText: "Stock", value: 1},
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
        initIndex={0}
        itemsArray={itemsArray}/>

        <div className='mselect-field'>
          <SelectField
          value={this.state.mvalue}
          onChange={this.measurementHandleChange}
          floatingLabelText="By Measurement Unit"
          fullWidth={false}
          autoWidth={true}>

            {measurementArray}

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
