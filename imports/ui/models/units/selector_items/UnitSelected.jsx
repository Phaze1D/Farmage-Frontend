import React from 'react';
import TrackOn from 'material-ui/svg-icons/image/lens';
import TrackOff from 'material-ui/svg-icons/image/panorama-fish-eye';
import {deepPurple500} from 'material-ui/styles/colors';




let UnitSelected = (props) => (
  <div className='row'>
    <div className='col-xs-12'>
      <div className='selector-item'>
        <div className='select-title'>
          <h3>
            Unit Name
            <span> Active Amount - 12 </span>
          </h3>
          <h5>Trackable</h5>
          <TrackOn style={{fill: deepPurple500}}/>
        </div>

        <div className='extra-info'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquisi ut alm id est laborum.
        </div>
      </div>
    </div>
  </div>
)

export default UnitSelected;
