import React from 'react';
import TrackOn from 'material-ui/svg-icons/image/lens';
import TrackOff from 'material-ui/svg-icons/image/panorama-fish-eye';
import {deepPurple500, grey400} from 'material-ui/styles/colors';




let UnitSelected = (props) => {

  const fillStyle = {};
  fillStyle.fill = props.unit.trackable ? deepPurple500 : grey400;
  fillStyle.color = props.unit.trackable ? deepPurple500 : grey400;
  const trackB = props.unit.trackable ? <TrackOn style={fillStyle}/> : <TrackOff style={fillStyle}/>;

  return(
    <div className='row'>
      <div className='col-xs-12'>
        <div className='selector-item'>
          <div className='select-title'>
            <h3>
              {props.unit.name}

              {props.unit.trackable ?
                <span> Active - {props.unit.active} </span>
                :
                <span> Active Sub Units - {props.unit.activeSub} </span>
              }
            </h3>

            <h5 style={fillStyle}>
              Trackable
            </h5>
            {trackB}
          </div>

          {props.unit.description && props.unit.description.length > 0 && 
            <div className='extra-info'>
              {props.unit.description}
            </div>
          }
        </div>
      </div>
    </div>
  )
}


export default UnitSelected;
