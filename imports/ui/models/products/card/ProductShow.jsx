import React from 'react';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import MShow from '../../../structure/mshow/MShow';
import MAvatar from '../../../structure/mavatar/MAvatar';
import MTabs from '../../../structure/mtabs/MTabs';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import ProductsNew from '../new/ProductsNew';
import UserShowInfo from '../../ousers/UserShowInfo';
import MFade from '../../../structure/mfade/MFade';



import {factoryProduct} from '../faker/factoryProduct';


export default class ProductShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0, ropen: false}

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.toggleRight = this.toggleRight.bind(this);

    this.product = factoryProduct();
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
        title={this.product.name}
        subTitle={this.product.sku}
        hasFAB={true}
        hasAvatar={true}
        avatarURL={this.product.imageUrl}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary', 'Analytics', 'Reports']}/>

        <MFade>
          <SwipeableViews onChangeIndex={this.handleSwipe} index={this.state.tabValue} animateHeight={false}>
            <ProductSummary product={this.product}/>
            <div>Reports</div>
            <div>Analytics</div>
          </SwipeableViews>
        </MFade>


        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <ProductsNew
            onCloseRight={this.toggleRight}
            headerTitle='Update Product'
            objectID='asdfadf'
            isUpdate={true}/>

        </RightDrawer>

      </MShow>
    )
  }
}


let ProductSummary = (props) => {
  const{
    product
  } = props

  let sizeClas = 'mtab-info';
  let size = product.size;

  if( !(size && size.length > 0) ){
    size = 'Empty'
    sizeClas = 'mtab-info none'
  }

  let desClas = 'mtab-info text-wrap';
  let description = product.description;

  if( !(description && description.length > 0) ){
    description = 'Empty'
    desClas = 'mtab-info none'
  }

  const resourceList = product.resources.map( (resource) =>
    <ResourceCard key={resource.resourceID} {...resource}/>
  )

  return(
    <div className='mtab-content'>
      <h3>Product Information</h3>

      <div className='mtab-show-flex'>
        <div className='mtab-content-card'>
          <div className='mtab-info'>
            <span>Name</span>
            {product.name}
          </div>

          <div className='mtab-info'>
            <span>SKU</span>
            {product.sku}
          </div>

          <div className={sizeClas} >
            <span>Size</span>
            {size}
          </div>
        </div>

        <div className='mtab-content-card flex-column'>
          <div className='mtab-info'>
            <span>Unit Price</span>
            ${product.unitPrice}
          </div>

          <div className='mtab-info'>
            <span>Tax Rate</span>
            {product.taxRate}%
          </div>

          <div className='mtab-info'>
            <span>Total Price</span>
            ${(product.unitPrice * (1 + (product.taxRate/100))).toFixed(2)}
          </div>

          <div className='mtab-info' style={{marginBottom: '16px'}}>
            <span>In Stock</span>
            {product.stock}
          </div>

        </div>

        <div className='mtab-content-card'>
          <div className={desClas} >
            <span>Description</span>
            {description}
          </div>
        </div>

      </div>

      <h3 style={{marginTop: '25px'}}>Resources</h3>

      <div className='mtab-show-flex'>
        {resourceList}
      </div>

      <h3 style={{marginTop: '25px'}}>User Information</h3>

      <div className='mtab-show-flex'>
        <UserShowInfo user={product.createdBy} subTitle='Created' date={product.createdAt}/>
        <UserShowInfo user={product.updatedBy} subTitle='Updated' date={product.updatedAt}/>
      </div>
    </div>
  )
}

let ResourceCard = (props) => (
  <div className='mtab-content-card'>
    <div className='select-title'>
      <MAvatar className='card-avatar'
        style={{marginRight: '15px', padding: '1px 0 0 1px'}}
        size={56} cha={props.name.toUpperCase().charAt(0)} src={props.resource.imageUrl}/>

      <h2>
        {props.resource.name}
        <span> Measurement Unit - {props.resource.measurementUnit} </span>
      </h2>
    </div>

    <div className='mtab-info' style={{margin: '15px 0 0'}}>
      <span>Amount Pre Product</span>
      {props.amountPre} {props.measurementUnit}
    </div>
  </div>
)

// Object Info
