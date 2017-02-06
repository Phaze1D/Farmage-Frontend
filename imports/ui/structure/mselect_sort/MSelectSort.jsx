import React from 'react';
import SelectField from 'material-ui/SelectField';
// import ArrowUp from 'material-ui/svg-icons/action/trending-up';
// import ArrowDown from 'material-ui/svg-icons/action/trending-down';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';


import MenuItem from 'material-ui/MenuItem';
import {cyan500, teal500} from 'material-ui/styles/colors';



export default class MSelectSort extends React.Component{
  constructor(props){
    super(props);
    this.state = {ikey: {index: this.props.initIndex, type: true}};

    this.sortHandleChange = this.sortHandleChange.bind(this);
  }

  sortHandleChange(event, index, value){
    this.props.onSelected(event, index, value);
    if(this.state.ikey.index === index){
      const pt = this.state.ikey.type
      this.setState({ikey: {index: index, type: !pt}})
    }else{
      this.setState({ikey: {index: index, type: true }})
    }
  }

  render(){

    const {
      itemsArray,
      onChange,
      onSelected,
      initIndex,
      ...selectProps
    } = this.props

    const items = itemsArray.map((item, index) =>
      <MenuItem key={index} value={item.value} primaryText={item.primaryText}
        rightIcon={
          (this.state.ikey.index === index && this.state.ikey.type) ?
          <ArrowUp/> :
          <ArrowDown/>
          }
      />

    );

    return(
      <div className='mselect-sort'>
        <SelectField {...selectProps} onChange={this.sortHandleChange}>
          {items}
        </SelectField>

        {!this.state.ikey.type ?
          <ArrowUp className='current-icon' style={{fill: cyan500}}/>
          :
          <ArrowDown className='current-icon' style={{fill: teal500}}/>
        }
      </div>
    )
  }
}
