
import React from 'react'
import MFade from '../../../structure/mfade/MFade';
import ExpensesGraph from '../../expenses/reports/ExpensesGraph';
import SectorProducedGraph from '../reports/SectorProducedGraph';






export default class SectorAnalytics extends React.Component{
  constructor(props){
    super(props);

  }


  render(){

    return(
      <div className='mtab-content'>
        <MFade time={1000}>
          <div>
            <ExpensesGraph/>
            <SectorProducedGraph />
          </div>
        </MFade>
      </div>
    )
  }
}
