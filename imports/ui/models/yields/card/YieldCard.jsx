import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';

import classnames from 'classnames';


export default class YieldCard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {
      _id,
      identifer,
      amount,
      createdAt,
      expiresAt,
      resource,
      ...others
    } = this.props;


    let title = '';
    if(identifer && identifer.length > 0){
      title = identifer;
    }else{
      title = _id;
    }

    const char = resource.name.toUpperCase().charAt(0);

    return(
      <MCard>

        <div className='card-top resource-top'>
          <MAvatar className='card-avatar'
            style={{marginRight: '15px', padding: '0px 0 0 0px'}}
            size={28} cha={char} src={resource.imageUrl}/>
          <CardTitle className='card-title-sm' title={resource.name} subtitle=''/>
        </div>

        <div className='cyield-info'>
          
        </div>


        <CardActions className='card-actions'>
          <FlatButton className='action' label='Movements' />
          <FlatButton className='action' label='Inventories' />
        </CardActions>

      </MCard>

    )
  }
}
