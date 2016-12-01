import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import {randomImageColor, alphaImageColor} from '../../../structure/app/RandomColor.js';


import classnames from 'classnames';

export default class ResourceCard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {
      name,
      measurementUnit,
      imageUrl,
      totalAmount,
      ...others
    } = this.props;

    const title = `${name}`;
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
              <CardTitle className='card-title' title={title} subtitle={`${measurementUnit}`}/>
            </div>
            <div className='cresource-info'>
              <div className='total'>
                {totalAmount}
                <span></span>
              </div>
              <div className='ins'>
                In Stock
              </div>
            </div>
            <CardActions className='card-actions'>
              <FlatButton className='action' label='Yields' secondary={true}
                onTouchTap={() => {browserHistory.push('/dashboard/yields')} }/>
              <FlatButton className='action' label='Products' secondary={true}
                onTouchTap={() => {browserHistory.push('/dashboard/products')} }/>
            </CardActions>
          </div>
      </MCard>

    )
  }
}
