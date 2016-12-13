import React from "react"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import ArrowUp from 'material-ui/svg-icons/action/trending-up';
import ArrowDown from 'material-ui/svg-icons/action/trending-down';
import ReactDOM from 'react-dom';



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class PersonFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      svalue: 1, cmin: null, umin: null,
      ikey: {index: 0, type: true}
    };

    this.sortHandleChange = this.sortHandleChange.bind(this);
    this.sitems = this.sitems.bind(this);
  }

  sortHandleChange(event, index, value){
    if(this.state.ikey.index === index){
      const pt = this.state.ikey.type
      this.setState({ikey: {index: index, type: !pt}, svalue: value })
    }else{
      this.setState({ikey: {index: index, type: true }, svalue: value })
    }
  };

  sitems(){
    return[
      <MenuItem key={0} value={1} primaryText="First Name"
        rightIcon={(this.state.ikey.index === 0 && this.state.ikey.type) ? <ArrowUp /> : <ArrowDown/>} />,
      <MenuItem key={1} value={2} primaryText="Last Name"
        rightIcon={(this.state.ikey.index === 1 && this.state.ikey.type) ? <ArrowUp /> : <ArrowDown/>}/>,
      <MenuItem key={2} value={3} primaryText="Email"
        rightIcon={(this.state.ikey.index === 2 && this.state.ikey.type) ? <ArrowUp /> : <ArrowDown/>}/>,
      <MenuItem key={3} value={4} primaryText="Company"
        rightIcon={(this.state.ikey.index === 3 && this.state.ikey.type) ? <ArrowUp /> : <ArrowDown/>}/>,
      <MenuItem key={4} value={4} primaryText="Created"
        rightIcon={(this.state.ikey.index === 4 && this.state.ikey.type) ? <ArrowUp /> : <ArrowDown/>}/>,
      <MenuItem key={5} value={4} primaryText="Updated"
        rightIcon={(this.state.ikey.index === 5 && this.state.ikey.type) ? <ArrowUp /> : <ArrowDown/>}/>
    ]
  }



  render(){
    return(
      <div className='mfilter-content' ref='mfilterContent'>

        <div className='select-w-icon'>
          <SelectField
            value={this.state.svalue}
            onChange={this.sortHandleChange}
            floatingLabelText="Sort By"
            fullWidth={false}
            autoWidth={false}
          >
            {this.sitems()}
          </SelectField>

          {!this.state.ikey.type ?
            <ArrowUp className='current-icon'/>
            :
            <ArrowDown className='current-icon'/>
          }
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




// Sort
// First Name
// Last Name
// Company

// Range
// Date of Birth
// Date Created
// Date Updated
