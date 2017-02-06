import React from "react"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import StorageSVG from 'material-ui/svg-icons/device/storage';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import MSelectSort from '../../../structure/mselect_sort/MSelectSort';

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class BatchesFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      svalue: 4,
      cmin: null, umin: null, emin: null
    }

    this.sortHandleChange = this.sortHandleChange.bind(this);
  }

  sortHandleChange(event, index, value){
    this.setState({svalue: value});
  }


  render(){

    const itemsArray = [
      {primaryText: "Identifer", value: 0},
      {primaryText: "Product", value: 1},
      {primaryText: "Amount", value: 2},
      {primaryText: "Expiration Date", value: 3},
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

        <Subheader className='filter-header'>Expiration Date</Subheader>
        <DatePicker
          className='mselect-field'
          name="created_from"
          hintText="From"
          fullWidth={false}
          onChange={ (event, date) => {this.setState({emin: date}) } }
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
          minDate={this.state.emin}
          disabled={this.state.emin === null}
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

        <Subheader className='filter-header'></Subheader>
        <div className='mselect-field'>
          <RaisedButton label="Export" primary={true} fullWidth={true} icon={<StorageSVG className='raised-bsvg' />} />
        </div>
        <Subheader className='filter-header'></Subheader>


      </div>

    )
  }
}
