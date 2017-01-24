import React from 'react';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import {deepPurple500, grey400} from 'material-ui/styles/colors';
import TrackOn from 'material-ui/svg-icons/image/lens';
import TrackOff from 'material-ui/svg-icons/image/panorama-fish-eye';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import UnitsNew from '../new/UnitsNew';
import UserShowInfo from '../../ousers/UserShowInfo';
import MFade from '../../../structure/mfade/MFade';

import classnames from 'classnames'

import {factoryUnit} from '../faker/factoryUnit';


export default class UnitShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleSwipe = this.handleSwipe.bind(this);
    this.toggleRight = this.toggleRight.bind(this);

    this.unit = factoryUnit();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  handleSwipe(index, indexLatest){
    this.setState({tabValue: index})
  }

  toggleRight(event){
    this.setState({ropen: !this.state.ropen})
  }

  render(){

    return(
      <MShow
        onFabClick={this.toggleRight}
        title={this.unit.name}
        hasFAB={true}
        hasAvatar={false}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary', 'Analytics', 'Reports']}/>

        <MFade>
          <SwipeableViews onChangeIndex={this.handleSwipe} index={this.state.tabValue} animateHeight={false}>
            <UnitSummary unit={this.unit}/>
            <div>Reports</div>
            <div>Analytics</div>
          </SwipeableViews>
        </MFade>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <UnitsNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Unit'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>
    )
  }
}


let UnitSummary = (props) => {

  const {
    unit
  } = props;

  let desClas = 'mtab-info text-wrap';
  let description = unit.description;

  if( !(description && description.length > 0) ){
    description = 'Empty'
    desClas = 'mtab-info none'
  }

  const traClasses = classnames('mtab-info bool', {'on': unit.trackable});


  return(
    <div className='mtab-content'>
      <h3>Unit Information</h3>

      <div className='mtab-show-flex'>

        <div className='mtab-content-card'>
          <div className='mtab-info'>
            <span>Name</span>
            {unit.name}
          </div>

          <div className={traClasses}>
            <span>Trackable</span>
            {unit.trackable ? <TrackOn/> : <TrackOff/>}
          </div>

          {unit.trackable ?
            <div className='mtab-info' style={{color: deepPurple500}}>
              <span>Active</span>
              {unit.active}
            </div>
          :
            <div className='mtab-info'>
              <span>Active Sub Units</span>
              {unit.activeSub}
            </div>
          }

          <div className='mtab-info'>
            <span>Parent Unit</span>
            {unit.parentUnit ? unit.parentUnit.name : 'Organization '}
          </div>

        </div>

        <div className='mtab-content-card'>
          <div className={desClas} >
            <span>Description</span>
            {description}
          </div>
        </div>
      </div>

      <h3 style={{marginTop: '25px'}}>User Information</h3>

      <div className='mtab-show-flex'>
        <UserShowInfo user={unit.createdBy} subTitle='Created' date={unit.createdAt}/>
        <UserShowInfo user={unit.updatedBy} subTitle='Updated' date={unit.updatedAt}/>
      </div>

    </div>
  )
}


// <h3 style={{marginTop: '25px'}}>Parent Unit</h3>
//
// {unit.parentUnit ?
//   <div className='mtab-show-flex'>
//     <ParentUnit unit={unit.parentUnit}/>
//   </div>
//
//   :
//   <div className='mtab-show-flex'>Missing Empty State</div>
// }


let ParentUnit = (props) => {

  const fillStyle = {};
  props.unit.trackable = false;
  fillStyle.fill = props.unit.trackable ? deepPurple500 : grey400;
  fillStyle.color = props.unit.trackable ? deepPurple500 : grey400;
  const trackB = props.unit.trackable ? <TrackOn style={fillStyle}/> : <TrackOff style={fillStyle}/>;

  return(
        <div className='mtab-content-card selector-item' style={{border: 'none', width: 'auto'}}>
          <div className='select-title'>
            <h2>
              {props.unit.name}

              {props.unit.trackable ?
                <span> Active - {props.unit.active} </span>
                :
                <span> Active Sub Units - {props.unit.activeSub} </span>
              }
            </h2>

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
  )
}
