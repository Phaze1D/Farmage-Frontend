import React from 'react';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import MAvatar from '../../../structure/mavatar/MAvatar';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import BatchesNew from '../new/BatchesNew';
import UserShowInfo from '../../ousers/UserShowInfo';
import MFade from '../../../structure/mfade/MFade';



import {factoryBatch} from '../faker/factoryBatch';

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class BatchShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.toggleRight = this.toggleRight.bind(this);

    this.batch = factoryBatch();
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
    const title = this.batch.identifer ? this.batch.identifer : this.batch._id

    return(
      <MShow
        ref='mshow'
        onFabClick={this.toggleRight}
        title={title}
        subTitle='Batch Identifer'
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
            <BatchSummary batch={this.batch}/>
          </SwipeableViews>
        </MFade>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <BatchesNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Batch'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>
    )
  }
}


let BatchSummary = (props) => {

  let desClas = 'mtab-info text-wrap';
  let description = props.batch.notes;
  let identifer = props.batch.identifer && props.batch.identifer.length > 0 ? props.batch.identifer : props.batch._id;


  if( !(description && description.length > 0) ){
    description = 'Empty'
    desClas = 'mtab-info none'
  }

  let expireDateString = ''
  if(props.batch.expiresAt){
    expireDateString = new DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(props.batch.expiresAt);
  }else{
    expireDateString = 'Never'
  }

  const resourceList = props.batch.rYields.map((bResource) => {

    return(
      <ResourceCard
        key={bResource.resourceID}
        bResource={bResource}/>
    )
  })

  return(
    <div className='mtab-content'>
      <h3>Batch Information</h3>

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
              }).format(props.batch.createdAt)}
          </div>

          <div className='mtab-info' >
            <span>Expiration Date</span>
              {expireDateString}
          </div>
        </div>

        <div className='mtab-content-card'>
          <div className='cyield-info-flex' style={{padding: '0 0 16px'}}>
            <span style={{fontSize: '13px'}}>Product</span>
            <MAvatar className='cyield-img'
              style={{marginRight: '15px', padding: '1px 0 0 0px'}}
              size={48} cha={props.batch.product.name.toUpperCase().charAt(0)} src={props.batch.product.imageUrl}/>

            <div>
              {props.batch.product.name}
              <span style={{fontWeight: '500'}}>{props.batch.product.sku}</span>
            </div>

          </div>

          <div className='mtab-info' style={{fontSize: '20px'}}>
            <span>Amount</span>
              {props.batch.amount}
          </div>
        </div>

        <div className='mtab-content-card'>
          <div className={desClas} >
            <span>Description</span>
            {description}
          </div>
        </div>



      </div>

      <h3 style={{marginTop: '25px'}}>{props.batch.product.name} Resources</h3>

      <div className='mtab-show-flex'>
        {resourceList}
      </div>

      <h3 style={{marginTop: '25px'}}>User Information</h3>

      <div className='mtab-show-flex'>
        <UserShowInfo user={props.batch.createdBy} subTitle='Created' date={props.batch.createdAt}/>
        <UserShowInfo user={props.batch.updatedBy} subTitle='Updated' date={props.batch.updatedAt}/>
      </div>

    </div>
  )
}


let ResourceCard = (props) => {

  const yieldList = props.bResource.yields.map( (bYield) =>
    <YieldCard key={bYield.yieldID} bYield={bYield} measurementUnit={props.bResource.resource.measurementUnit}/>
  )

  return(
    <div className='mtab-content-card' style={{maxWidth: 'calc(100% - 16px)', minWidth: 'calc(100% - 16px)', flexBasis: 'initial'}}>

      <div className='cyield-info-flex' style={{padding: '0 0 16px'}}>
        <MAvatar className='cyield-img'
          style={{marginRight: '15px', padding: '1px 0 0 0px'}}
          size={36} cha={props.bResource.resource.name.toUpperCase().charAt(0)} src={props.bResource.resource.imageUrl}/>

        <div>
          {props.bResource.resource.name}
          <span style={{fontWeight: '500'}}>
            Pre Product {props.bResource.amountPre} {props.bResource.resource.measurementUnit}
          </span>
        </div>
      </div>

      <div className='sell-show-subtitle'>Yields</div>

      {yieldList.length > 0 ? yieldList :

        <div className='mtab-info none'>
          None
        </div>
      }
    </div>
  )
}


let YieldCard = (props) => {

  let identifer = props.bYield.yield.identifer && props.bYield.yield.identifer.length > 0
    ? props.bYield.yield.identifer : props.bYield.yield._id;

  let expireDateString = ''
  if(props.bYield.yield.expiresAt){
    expireDateString = new DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(props.bYield.yield.expiresAt);
  }else{
    expireDateString = 'Never'
  }

  return(
    <div className='mtab-info-flex'>
      <div className='mtab-info'>
        <span>Yield Identifer</span>
        {identifer}
      </div>

      <div className='mtab-info'>
        <span>Amount Taken</span>
        {props.bYield.amountTaken} {props.measurementUnit}
      </div>

      <div className='mtab-info'>
        <span>Created Date</span>
          {new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(props.bYield.yield.createdAt)}
      </div>

      <div className='mtab-info' style={{marginBottom: '16px'}}>
        <span>Expiration Date</span>
        {expireDateString}
      </div>
    </div>
  )
}
