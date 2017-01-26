
import React from 'react'
import MFade from '../../../structure/mfade/MFade';
import SellsGraph from '../../sells/reports/SellsGraph';
import ProductsGraph from '../../products/reports/ProductsGraph';




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
            <ProductsGraph/>
          </div>
        </MFade>
      </div>
    )
  }
}
