
import React from 'react'
import MFade from '../../../structure/mfade/MFade';
import SellsGraph from '../../sells/reports/SellsGraph';



export default class CustomerAnalytics extends React.Component{
  constructor(props){
    super(props);

  }


  render(){

    return(
      <div className='mtab-content'>
        <MFade time={1000}>
          <SellsGraph />
        </MFade>
      </div>
    )
  }
}






/*
Product Graph
  x-axis = time
  y-axis = quantity

Top 5 Products

Conditions
  hasBatch
  sellIsPaid
  time Range
*/
