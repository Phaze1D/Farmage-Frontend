import React from 'react';
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import OUserShow from './OUserShow';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';




export default class OUserCard extends React.Component{
  constructor(props){
    super(props)

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
      <MCard ref='mcard' options={this.cardOptions()}>
        <div className='card-top' onTouchTap={this.handleOnShow}>
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
          Sales Manager
          <span>View and edit sells and clients</span>
        </div>

        <div className={classnames('ouser-permission', {'on': permissions.unitsManager})}>
          Sectors Manager
          <span>View and edit units and yields</span>
        </div>

        <div className={classnames('ouser-permission', {'on': permissions.expensesManager})}>
          Expenses Manager
          <span>View and edit expenses and providers</span>
        </div>

        <div className={classnames('ouser-permission', {'on': permissions.batchesManager})}>
          Batches Manager
          <span>View and edit batches and products</span>
        </div>

        <div className={classnames('ouser-permission', {'on': permissions.usersManager})}>
          Users Manager
          <span>Invite and remove users</span>
        </div>

        <CardActions className='card-actions'>
          <FlatButton className='action' label='Movements' secondary={true}
            onTouchTap={() => {browserHistory.push('/movements')} }/>
        </CardActions>

        <AutoLockScrolling lock={this.state.showCard}/>

        {this.state.isOpened &&
          <OUserShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShow}
            open={this.state.showCard}/>
        }
      </MCard>
    )
  }

}
