
import React from 'react'
import MFade from '../../../structure/mfade/MFade';
import ProductGraph from '../reports/ProductGraph';




export default class ProductAnalytics extends React.Component{
  constructor(props){
    super(props);

  }


  render(){

    return(
      <div className='mtab-content'>
        <MFade time={1000}>
          <div>
            <ProductGraph/>
          </div>
        </MFade>
      </div>
    )
  }
}
