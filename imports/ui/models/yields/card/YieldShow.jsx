import React from 'react';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import MAvatar from '../../../structure/mavatar/MAvatar';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import YieldsNew from '../new/YieldsNew';
import UserShowInfo from '../../ousers/UserShowInfo';
import MFade from '../../../structure/mfade/MFade';



import {factoryYield} from '../faker/factoryYield';

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.toggleRight = this.toggleRight.bind(this);

    this.yield = factoryYield();
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
    const title = this.yield.identifer ? this.yield.identifer : this.yield._id

    return(
      <MShow
        onFabClick={this.toggleRight}
        title={title}
        subTitle='Yield Identifer'
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
            <YieldSummary yield={this.yield}/>
            <div>Reports</div>
            <div>Analytics</div>
          </SwipeableViews>
        </MFade>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <YieldsNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Yield'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>
    )
  }
}


let YieldSummary = (props) => {

  let desClas = 'mtab-info text-wrap';
  let description = props.yield.notes;
  let identifer = props.yield.identifer && props.yield.identifer.length > 0 ? props.yield.identifer : props.yield._id;


  if( !(description && description.length > 0) ){
    description = 'Empty'
    desClas = 'mtab-info none'
  }

  let expireDateString = ''
  if(props.yield.expiresAt){
    expireDateString = new DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(props.yield.expiresAt);
  }else{
    expireDateString = 'Never'
  }

  return(
    <div className='mtab-content'>
      <h3>Yield Information</h3>

      <div className='mtab-show-flex'>
        <div className='mtab-content-card'>
          <div className='mtab-info'>
            <span>Identifer</span>
            {identifer}
          </div>

          <div className='mtab-info'>
            <span>Created Date</span>
              {new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }).format(props.yield.createdAt)}
          </div>

          <div className='mtab-info' >
            <span>Expiration Date</span>
              {expireDateString}
          </div>
        </div>

        <div className='mtab-content-card'>

          <div className='cyield-info-flex' style={{padding: '0 0 16px'}}>
            <span style={{fontSize: '13px'}}>Resource</span>
            <MAvatar className='cyield-img'
              style={{marginRight: '15px', padding: '1px 0 0 0px'}}
              size={32} cha={props.yield.resource.name.toUpperCase().charAt(0)} src={props.yield.resource.imageUrl}/>

            {props.yield.resource.name}
          </div>

          <div className='mtab-info'>
            <span>Amount</span>
              {props.yield.amount} {props.yield.resource.measurementUnit}
          </div>


          <div className='mtab-info'>
            <span>From Unit</span>
              {props.yield.unit.name}
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
        <UserShowInfo user={props.yield.createdBy} subTitle='Created' date={props.yield.createdAt}/>
        <UserShowInfo user={props.yield.updatedBy} subTitle='Updated' date={props.yield.updatedAt}/>
      </div>
    </div>
  )
}
