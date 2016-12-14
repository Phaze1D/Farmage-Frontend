import React from 'react';
import MTextField from '../../../structure/textfield/MTextField';
import Divider from 'material-ui/Divider';




export default class YieldInvItem extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className='row'>
        <div className='col-xs-12'>
          <div className='selector-item'>

            <div className='ytitle-info'>
              <span>
                Resource Per Product : 2

              </span>

              Inventory Amount : 12
            </div>

            <YieldDetail/>
            <YieldDetail/>

          </div>
        </div>
      </div>
    )
  }
}


const YieldDetail = (props) => (

  <div className='yield-section'>
    <div className='yield-info'>
      <span>Yield Identifier</span>
      EG-333
    </div>

    <div className='yield-info'>
      <span>Yield Amount</span>
      113
    </div>

    <div className='yield-info'>
      <span>Created Date</span>
      11/12/2016
    </div>

    <div className='yield-info'>
      <span>Expires At</span>
      11/12/2016
    </div>

    <MTextField
        name="amount_taken"
        type="number"
        boxClass="input-row"
        hintText=""
        floatingLabelText="Taken"
        defaultValue='1'
        floatingLabelFixed={true}
        fullWidth={true}
        prefix="eggs"
        prefixSide="right"/>

  </div>

)
