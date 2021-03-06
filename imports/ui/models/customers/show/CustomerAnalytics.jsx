
import React from 'react'
import MFade from '../../../structure/mfade/MFade';
import SellsGraph from '../../sells/reports/SellsGraph';
import TopProductsGraph from '../../products/reports/TopProductsGraph';




export default class CustomerAnalytics extends React.Component{
  constructor(props){
    super(props);

  }


  render(){

    return(
      <div className='mtab-content'>
        <MFade time={1000}>
          <div>
            <SellsGraph />
            <TopProductsGraph/>
          </div>
        </MFade>
      </div>
    )
  }
}
