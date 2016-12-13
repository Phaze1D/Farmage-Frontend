import React from "react"
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import ReactDOM from 'react-dom';
import MSelectSort from '../../structure/mselect_sort/MSelectSort';



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class PersonFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = { svalue: 0, cmin: null, umin: null};

    this.sortHandleChange = this.sortHandleChange.bind(this);
  }

  sortHandleChange(event, index, value){
    this.setState({svalue: value })
  };


  render(){

    const itemsArray = [
      {primaryText: "First Name", value: 0},
      {primaryText: "Last Name", value: 1},
      {primaryText: "Email", value: 2},
      {primaryText: "Company", value: 3},
      {primaryText: "Created At", value: 4},
      {primaryText: "Updated At", value: 5}
    ]

    return(
      <div className='mfilter-content' ref='mfilterContent'>

        <MSelectSort value={this.state.svalue}
        onSelected={this.sortHandleChange}
        floatingLabelText="Sort By"
        fullWidth={false}
        autoWidth={false}
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




// Sort
// First Name
// Last Name
// Company

// Range
// Date of Birth
// Date Created
// Date Updated
