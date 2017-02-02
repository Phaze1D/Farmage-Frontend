
import React from 'react'
import MFade from '../../../structure/mfade/MFade';
import ExpensesProviderGraph from '../../expenses/reports/ExpensesProviderGraph';




export default class ProviderAnalytics extends React.Component{
  constructor(props){
    super(props);

  }


  render(){

    return(
      <div className='mtab-content'>
        <MFade time={1000}>
          <div>
            <ExpensesProviderGraph />
          </div>
        </MFade>
      </div>
    )
  }
}
