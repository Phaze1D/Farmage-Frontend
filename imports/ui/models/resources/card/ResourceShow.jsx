import React from 'react';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import ResourcesNew from '../new/ResourcesNew';
import UserShowInfo from '../../ousers/UserShowInfo';
import MFade from '../../../structure/mfade/MFade';
import ResourceAnalytics from './ResourceAnalytics';

import {factoryResource} from '../faker/factoryResource';


export default class ResourceShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.toggleRight = this.toggleRight.bind(this);


    this.resource = factoryResource();
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

  toggleRight(event){
    this.setState({ropen: !this.state.ropen})
  }

  render(){

    return(
      <MShow
        ref='mshow'
        onFabClick={this.toggleRight}
        title={this.resource.name}
        subTitle={this.resource.measurementUnit}
        hasFAB={true}
        hasAvatar={true}
        avatarURL={this.resource.imageUrl}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary', 'Analytics', 'Reports']}/>

        <SwipeableViews onChangeIndex={this.handleSwipe} index={this.state.tabValue} animateHeight={false}>
          <MFade>
            <ResourceSummary resource={this.resource}/>
          </MFade>

          <ResourceAnalytics resource={this.resource}/>

          <div>Reports</div>
        </SwipeableViews>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <ResourcesNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Resource'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>
    )
  }
}


let ResourceSummary = (props) => {

  const {
    resource
  } = props;

  // let desClas = 'mtab-info text-wrap';
  // let notes = resource.notes;
  //
  // if( !(notes && notes.length > 0) ){
  //   notes = 'Empty'
  //   desClas = 'mtab-info none'
  // }

  return(
    <div className='mtab-content'>
      <h3>Resource Information</h3>

      <div className='mtab-show-flex'>
        <div className='mtab-content-card'>
          <div className='mtab-info'>
            <span>Name</span>
            {resource.name}
          </div>

          <div className='mtab-info'>
            <span>Measurement Unit</span>
            {resource.measurementUnit}
          </div>

          <div className='mtab-info' >
            <span>In Stock</span>
            {resource.stock} {resource.measurementUnit}
          </div>
        </div>

        {/*<div className='mtab-content-card'>
          <div className={desClas}>
            <span>Description</span>
            {notes}
          </div>
        </div>*/}
      </div>

      <h3 style={{marginTop: '25px'}}>User Information</h3>

      <div className='mtab-show-flex'>
        <UserShowInfo user={resource.createdBy} subTitle='Created' date={resource.createdAt}/>
        <UserShowInfo user={resource.updatedBy} subTitle='Updated' date={resource.updatedAt}/>
      </div>


    </div>
  )
}
