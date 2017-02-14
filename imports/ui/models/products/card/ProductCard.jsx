import React from 'react';
import { browserHistory } from 'react-router'

import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import {randomImageColor, alphaImageColor} from '../../../structure/app/RandomColor.js';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';
import ProductShow from './ProductShow';
import classnames from 'classnames';

export default class ProductCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {showCard: false, isOpened: false}

    this.handleOnShow = this.handleOnShow.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this)
    this.cardOptions = this.cardOptions.bind(this)

  }

  handleOnShow(event){
    if(this.state.showCard){
      this.setState({showCard: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showCard: true, isOpened: true})
    }
  }

  handleUpdate(){
    this.props.onRequestUpdate(this.props._id)
  }

  cardOptions(){
    return [
      <MenuItem key='edit' primaryText="Edit" leftIcon={<ImageEdit />} onTouchTap={this.handleUpdate}/>,
      <Divider key='divider'/>,
      <MenuItem key='delete' primaryText="Delete" leftIcon={<ActionDelete />} />,
    ]
  }

  render(){
    const {
      name,
      sku,
      unitPrice,
      taxRate,
      imageUrl,
      stock,
      ...others
    } = this.props;

    const title = `${name}`;
    const totalPrice = (unitPrice * (1 + (taxRate/100))).toFixed(2)
    let char = '';

    if(!imageUrl){
      char = title.toUpperCase().charAt(0);
    }

    const iStyle = {
      backgroundImage: "url('" + imageUrl + "')",
      backgroundColor: alphaImageColor(char)
    }

    return(
      <MCard className='card-row-flex' options={this.cardOptions()}>
          <div className='image-col' style={iStyle}>
            {char}
          </div>

          <div className='info-col'>
            <div className='card-top resource-top' style={{border: 'none'}} onTouchTap={this.handleOnShow}>
              <CardTitle className='card-title' title={title} subtitle={sku}/>
            </div>
            <div className='product-csection'>
              <div className='product-cinfo'>
                <span>In Stock</span>
                {stock}
              </div>
              <div className='product-cinfo'>
                <span>Total Price</span>
                ${totalPrice}
              </div>
            </div>
            <CardActions className='card-actions'>
              <FlatButton className='action' label='Batches' secondary={true}
                onTouchTap={() => {browserHistory.push('/batches')} }/>
              <FlatButton className='action' label='Sales' secondary={true}
                onTouchTap={() => {browserHistory.push('/sells')} }/>
              {/*<FlatButton className='action' label='Resources' secondary={true}/>*/}
            </CardActions>
          </div>


          <AutoLockScrolling lock={this.state.showCard}/>

          {this.state.isOpened &&
            <ProductShow
              onFabClick={this.handleUpdate}
              personID={this.props._id}
              onRequestChange={this.handleOnShow}
              open={this.state.showCard}/>
          }
      </MCard>

    )
  }
}
