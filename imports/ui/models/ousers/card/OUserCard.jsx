import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import classnames from 'classnames';
import { browserHistory } from 'react-router';



export default class OUserCard extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let {
      firstName,
      lastName,
      email,
      avatarURL,
      permissions,
      ...others
    } = this.props

    if(lastName === undefined) lastName = '';
    const title = `${firstName} ${lastName}`;
    const char = title.toUpperCase().charAt(0);

    return(
      <MCard>
        <div className='card-top'>
          <MAvatar className='card-avatar'
            style={{marginRight: '15px', padding: '1px 0 0 1px'}}
            size={56} cha={char} src={avatarURL}/>
          <CardTitle className='card-title' title={title} subtitle={email}/>
        </div>

        <Subheader className="ouser-perTitle">Permissions</Subheader>

        <div className={classnames('ouser-permission', {'on': permissions.owner})}>
          Owner
          <span>View and Edit everything</span>
        </div>

        <div className={classnames('ouser-permission', {'on': permissions.viewer})}>
          Viewer
          <span>View everything</span>
        </div>

        <div className={classnames('ouser-permission', {'on': permissions.sellsManager})}>
          Sells Manager
          <span>View and edit sells and clients</span>
        </div>

        <div className={classnames('ouser-permission', {'on': permissions.unitsManager})}>
          Units Manager
          <span>View and edit units and yields</span>
        </div>

        <div className={classnames('ouser-permission', {'on': permissions.expensesManager})}>
          Expenses Manager
          <span>View and edit expenses and providers</span>
        </div>

        <div className={classnames('ouser-permission', {'on': permissions.inventoriesManager})}>
          Inventories Manager
          <span>View and edit inventories and products</span>
        </div>

        <div className={classnames('ouser-permission', {'on': permissions.usersManager})}>
          Users Manager
          <span>Invite and remove users</span>
        </div>

        <CardActions className='card-actions'>
          <FlatButton className='action' label='Movements' secondary={true}
            onTouchTap={() => {browserHistory.push('/dashboard/movements')} }/>
        </CardActions>
      </MCard>
    )
  }

}
