import React from 'react';
import ToggleRadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import ToggleRadioButtonUnChecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';


let UnitSelectorItem = (props) => (
  <div className='row'>
    <div className='col-xs-12'>
      <div className='selector-item'>
        <div className='select-title'>
          <h3>
            Main Title
            <span> Amount - 12 </span>
          </h3>
          <h5>Tracking</h5>
          <ToggleRadioButtonChecked/>
        </div>

        <div className='extra-info'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquisi ut alm id est laborum.
        </div>
      </div>
    </div>
  </div>
)

export default UnitSelectorItem;
