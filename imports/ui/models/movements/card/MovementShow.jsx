import React from 'react';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import {deepPurple500, grey400} from 'material-ui/styles/colors';
import TrackOn from 'material-ui/svg-icons/image/lens';
import TrackOff from 'material-ui/svg-icons/image/panorama-fish-eye';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import UserShowInfo from '../../ousers/UserShowInfo';
import MFade from '../../../structure/mfade/MFade';

import classnames from 'classnames'


import {factoryMovement} from '../faker/factoryMovement';


export default class MovementShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleSwipe = this.handleSwipe.bind(this);


    this.movement = factoryMovement();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
    if(this.refs.mshow && value !== 0){
      this.refs.mshow.hideFAB()
    }else if (this.refs.mshow && value === 0) {
      this.refs.mshow.showFAB()
    }
  }

  handleSwipe(value, indexLatest){
    this.setState({tabValue: value})
    if(this.refs.mshow && value !== 0){
      this.refs.mshow.hideFAB()
    }else if (this.refs.mshow && value === 0) {
      this.refs.mshow.showFAB()
    }
  }

  render(){

    return(
      <MShow
        ref='mshow'
        onFabClick={this.props.onFabClick}
        title={`${this.movement.forType} Movement`}
        subTitle={this.movement.forId}
        hasFAB={true}
        hasAvatar={false}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary']}/>

        <MFade>
          <SwipeableViews onChangeIndex={this.handleSwipe} index={this.state.tabValue} animateHeight={false}>
            <MovementSummary movement={this.movement}/>
            <div>Tables</div>
            <div>Analytics</div>
          </SwipeableViews>
        </MFade>

      </MShow>
    )
  }
}

let MovementSummary = (props) => {

  const {
    movement
  } = props

  let desClas = 'mtab-info text-wrap';
  let description = movement.notes;

  if( !(description && description.length > 0) ){
    description = 'Empty'
    desClas = 'mtab-info none'
  }

  const traClasses = classnames('mtab-info bool', {'on': movement.manuel});

  return(
    <div className='mtab-content'>

      <h3>Movement Information</h3>

      <div className='mtab-show-flex'>

        <div className='mtab-content-card'>
          <div className='mtab-info'>
            <span>For {movement.forType}</span>
            {movement.forId}
          </div>

          <div className={traClasses}>
            <span>Is Manual</span>
            {movement.manuel ? <TrackOn/> : <TrackOff/>}
          </div>

          <div className='mtab-info' style={{fontSize: '20px'}}>
            <span>Changed By</span>
            {movement.amount}
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
        <UserShowInfo user={movement.createdBy} subTitle='Created' date={movement.createdAt}/>
        <UserShowInfo user={movement.updatedBy} subTitle='Updated' date={movement.updatedAt}/>
      </div>

    </div>
  )
}
