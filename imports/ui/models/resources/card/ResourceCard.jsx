import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';

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
    const char = title.toUpperCase().charAt(0);

    return(
      <MCard>

        <div className='card-top resource-top' style={{border: 'none'}}>
          <MAvatar className='card-avatar'
            style={{marginRight: '15px', padding: '1px 0 0 1px'}}
            size={56} cha={char} src={imageUrl}/>
          <CardTitle className='card-title' title={title} subtitle={measurementUnit}/>
        </div>

        <div className='cresource-info'>
          <div className='total'>
            {totalAmount}
            <span>{measurementUnit}</span>
          </div>

          <div className='ins'>
            Available
          </div>
        </div>


        <CardActions className='card-actions'>
          <FlatButton className='action' label='Yields' />
          <FlatButton className='action' label='Products' />
        </CardActions>

      </MCard>

    )
  }
}
