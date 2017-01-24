import React from 'react'
import Chart from 'chart.js'
import DatePicker from 'material-ui/DatePicker';


import {factorySell} from '../faker/factorySell';



let DateTimeFormat = global.Intl.DateTimeFormat;

export default class SellsGraph extends React.Component{
  constructor(props){
    super(props)

    this.sells = []

    for(let i = 0; i < 20; i++){
      this.sells.push(factorySell());
    }

    this.sells.sort((a, b) => {
      return  a.createdAt - b.createdAt;
    });
  }


  render(){

    return(
      <div className='report-card'>
        <div className='report-top'>
          <div className='title'>Sells Report</div>

          <DatePicker
            className='range-date'
            name="created_to"
            hintText="From"
            fullWidth={true}
            formatDate={new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format} />

            <DatePicker
              className='range-date'
              name="created_to"
              hintText="To"
              fullWidth={true}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }).format} />


        </div>


      </div>
    )
  }
}


/*
Sells Graph
  x-axis = time
  y-axis = total price

Sum of Total Spent

Conditions
  isPaid
  status
  time Range
*/
