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

            <div className='title-info'>
              <span>
                 2 Resource Per Product
              </span>

              <div>
                Inventory Amount - 12
              </div>
            </div>

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
                <span>Created At</span>
                11/12/2016
              </div>

              <div className='yield-info'>
                <span>Expires At</span>
                11/12/2016
              </div>

            </div>

            <MTextField
                name="amount_taken"
                type="number"
                className=""
                hintText=""
                floatingLabelText="Amount Taken"
                defaultValue='1'
                floatingLabelFixed={true}
                fullWidth={true}
                prefix="eggs"
                prefixSide="right"/>

              <div className='row-divider'></div>

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
                    <span>Created At</span>
                    11/12/2016
                  </div>

                  <div className='yield-info'>
                    <span>Expires At</span>
                    11/12/2016
                  </div>

                </div>

                <MTextField
                    name="amount_taken"
                    type="number"
                    className=""
                    hintText=""
                    floatingLabelText="Amount Taken"
                    defaultValue='1'
                    floatingLabelFixed={true}
                    fullWidth={true}
                    prefix="eggs"
                    prefixSide="right"/>

          </div>
        </div>
      </div>
    )
  }
}
