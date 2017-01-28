
import React from 'react'
import MFade from '../../../structure/mfade/MFade';
import ProductSoldGraph from '../reports/ProductSoldGraph';
import ProductProducedGraph from '../reports/ProductProducedGraph';




export default class ProductAnalytics extends React.Component{
  constructor(props){
    super(props);

  }


  render(){

    return(
      <div className='mtab-content'>
        <MFade time={1000}>
          <div>
            <ProductSoldGraph/>
            <ProductProducedGraph/>
          </div>
        </MFade>
      </div>
    )
  }
}
