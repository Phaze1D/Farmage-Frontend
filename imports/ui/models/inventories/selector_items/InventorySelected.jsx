import React from 'react';
import TextField from 'material-ui/TextField';



const InventorySelected = (props) => (
  <div className='yield-section'>
    <div className='yield-info'>
      <span>Identifier</span>
      EG-333
    </div>

    <div className='yield-info'>
      <span>Created Date</span>
      11/12/2016
    </div>

    <div className='yield-info'>
      <span>Expires At</span>
      11/12/2016
    </div>

    <div className='yield-info'>
      <span>Available</span>
      113
    </div>

    <TextField
        name="amount_taken"
        type="number"
        className='input-row'
        hintText=""
        floatingLabelText="Taken"
        defaultValue='1'
        floatingLabelFixed={true}
        fullWidth={true}/>
  </div>
)

export default InventorySelected;
