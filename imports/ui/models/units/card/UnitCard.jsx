import React from 'react';
import MCard from '../../../structure/mcard/MCard';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import classnames from 'classnames';
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
      tracking,
      active,
      parentUnit,
      ...others
    } = this.props;

    const traClasses = classnames('unit-tr', {'on': tracking});
    const actClasses = classnames('cyield-info lg', {'unactive': !tracking});

    let movementAction = null;
    let toggleB = null;
    let activeDiv = null;

    if(tracking){
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

        <div className={actClasses}>
          <span>Active</span>
          {active}
        </div>

        <div className='cyield-info sm' style={{flexGrow: '1'}}>
          <span>Parent</span>
          {parentUnit.name}
        </div>

        <CardActions className='card-actions'>
          <FlatButton className='action' label='Yields' secondary={true} onTouchTap={() => {browserHistory.push('/dashboard/yields')} }/>
          <FlatButton className='action' label='Expenses' secondary={true} onTouchTap={() => {browserHistory.push('/dashboard/expenses')} }/>
          {movementAction}
        </CardActions>
      </MCard>
    )
  }
}
