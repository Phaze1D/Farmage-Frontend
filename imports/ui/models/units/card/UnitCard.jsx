import React from 'react';
import MCard from '../../../structure/mcard/MCard';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import classnames from 'classnames';
import {blueA100} from 'material-ui/styles/colors';
import TrackOn from 'material-ui/svg-icons/image/lens';
import TrackOff from 'material-ui/svg-icons/image/panorama-fish-eye';
import { browserHistory } from 'react-router'



export default class UnitCard extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    const {
      name,
      trackable,
      active,
      activeSub,
      parentUnit,
      showSubAction,
      onShowSubs,
      ...others
    } = this.props;

    const traClasses = classnames('unit-tr', {'on': trackable});
    let movementAction = null;
    let toggleB = null;
    let activeDiv = null;

    if(trackable){
      movementAction = <FlatButton className='action' label='Movements' secondary={true} onTouchTap={() => {browserHistory.push('/dashboard/movements')} }/>;
      toggleB = <TrackOn/>;
    }else{
      toggleB = <TrackOff/>;
    }

    return(
      <MCard>

        <div className='card-top' style={{display: 'block'}}>
          <CardTitle className='card-title' title={name}/>
          <div className={traClasses}>
            Trackable
            {toggleB}
          </div>
        </div>

        {trackable ?
          <div className='cyield-info'>
            <span style={{color: blueA100, fontWeight: '500'}} >Active</span>
            {active}
          </div>:
          <div className='cyield-info sm'>
            <span>Active Sub Units</span>
            {activeSub}
          </div>
        }

        <div className='cyield-info sm' style={{flexGrow: '1'}}>
          <span>Parent</span>
          {(parentUnit && parentUnit.name) ? parentUnit.name : 'Granja Granada'}
        </div>

        <CardActions className='card-actions'>
          {this.props.hasYields &&
            <FlatButton className='action' label='Yields' secondary={true} onTouchTap={() => {browserHistory.push('/dashboard/yields')} }/>
          }
          <FlatButton className='action' label='Expenses' secondary={true} onTouchTap={() => {browserHistory.push('/dashboard/expenses')} }/>
          {movementAction}

          {showSubAction && !trackable &&
            <IconButton
              className='sub-action'
              onTouchTap={onShowSubs} >
              {this.props.subActionButton}
            </IconButton>
          }

        </CardActions>
      </MCard>
    )
  }
}
