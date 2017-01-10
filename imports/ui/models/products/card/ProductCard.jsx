import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import {randomImageColor, alphaImageColor} from '../../../structure/app/RandomColor.js';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';


import classnames from 'classnames';

export default class ProductCard extends React.Component{
  constructor(props){
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this)
    this.cardOptions = this.cardOptions.bind(this)
  }

  handleUpdate(){
    this.props.onRequestUpdate(this.props._id)
  }

  cardOptions(){
    return [
      <MenuItem key='expand' primaryText="Expand" leftIcon={<FullScreen />} />,
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
            <div className='card-top resource-top' style={{border: 'none'}}>
              <CardTitle className='card-title' title={title} subtitle={`${sku}`}/>
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
      </MCard>

    )
  }
}
