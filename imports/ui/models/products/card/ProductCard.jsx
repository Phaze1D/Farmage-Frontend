import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import {randomImageColor, alphaImageColor} from '../../../structure/app/RandomColor.js';


import classnames from 'classnames';

export default class ProductCard extends React.Component{
  constructor(props){
    super(props);
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
      <MCard className='card-row-flex'>
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
                <span>Price</span>
                ${totalPrice}
              </div>
            </div>
            <CardActions className='card-actions'>
              <FlatButton className='action' label='Inventories' secondary={true}
                onTouchTap={() => {browserHistory.push('/dashboard/inventories')} }/>
              <FlatButton className='action' label='Sells' secondary={true}
                onTouchTap={() => {browserHistory.push('/dashboard/sells')} }/>
              {/*<FlatButton className='action' label='Resources' secondary={true}/>*/}
            </CardActions>
          </div>
      </MCard>

    )
  }
}
