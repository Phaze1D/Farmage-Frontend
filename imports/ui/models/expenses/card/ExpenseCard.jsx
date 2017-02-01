import React from 'react'
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';

import ExpenseShow from './ExpenseShow';
import UnitShow from '../../units/card/UnitShow';
import ProviderShow from '../../providers/show/ProviderShow';

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ExpenseCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showExpense: false,
      showUnit: false,
      showProvider: false,
      isOpened: false
    }

    this.handleOnShowProvider = this.handleOnShowProvider.bind(this)
    this.handleOnShowUnit = this.handleOnShowUnit.bind(this)
    this.handleOnShow = this.handleOnShow.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this)
    this.cardOptions = this.cardOptions.bind(this)

  }

  handleOnShow(event){
    if(this.state.showExpense){
      this.setState({showExpense: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showExpense: true, isOpened: true})
    }
  }

  handleOnShowUnit(event){
    if(this.state.showUnit){
      this.setState({showUnit: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showUnit: true, isOpened: true})
    }
  }

  handleOnShowProvider(event){
    if(this.state.showProvider){
      this.setState({showProvider: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showProvider: true, isOpened: true})
    }
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
      itemName,
      quantity,
      unitPrice,
      createdAt,
      receiptUrl,
      provider,
      unit,
      ...others
    } = this.props;

    const title = `${quantity} ${itemName}`;
    let lastName = (provider && provider.lastName) ? provider.lastName : '';
    let char = provider ? char = provider.firstName.toUpperCase().charAt(0) : '';

    const totalPrice = (unitPrice * quantity).toFixed(2);
    const createdS = new DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(createdAt);



    return(
      <MCard options={this.cardOptions()}>
        <div className='card-top' style={{border: 'none'}} onTouchTap={this.handleOnShow}>
          <CardTitle className='card-title' title={title} subtitle={createdS}/>
        </div>

        <div className='cresource-info ceboarder' style={{alignItems: 'center'}}>
          <div className='total' style={{fontSize: '30px'}}>
            -${totalPrice}
            <span></span>
          </div>
        </div>

        {provider ?
          <EnhancedButton style={{textAlign: 'left'}} onTouchTap={this.handleOnShowProvider}>
            <div className='cyield-info-flex clickable-info'>
              <span>Provider</span>
              <MAvatar className='cyield-img'
                style={{marginRight: '15px', padding: '1px 0 0 0px'}}
                size={32} cha={char} src={provider.avatarURL}/>

              <div>
                {`${provider.firstName} ${lastName}`}
                <div className='div-span'>{provider.company}</div>
              </div>
            </div>
          </EnhancedButton>
        :
          <div className='cyield-info-flex'>
            <span>Provider</span>
            <span style={{fontSize: '14px', fontWeight: '300'}}>None</span>
          </div>
        }

        <EnhancedButton style={{textAlign: 'left', flexGrow: '1'}} onTouchTap={this.handleOnShowUnit}>
          <div className='cyield-info sm clickable-info'>
            <span>For Sector</span>
            {unit.name}
          </div>
        </EnhancedButton>

        {/*<CardActions className='card-actions' style={{marginTop: '8px'}}></CardActions>*/}

        <AutoLockScrolling lock={this.state.isOpened}/>

        {this.state.isOpened &&
          <ExpenseShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShow}
            open={this.state.showExpense}/>
        }

        {this.state.isOpened &&
          <UnitShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShowUnit}
            open={this.state.showUnit}/>
        }

        {this.state.isOpened &&
          <ProviderShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShowProvider}
            open={this.state.showProvider}/>
        }

      </MCard>
    )
  }
}
