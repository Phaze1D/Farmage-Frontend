import React from 'react'
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class SellCard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {
      reference,
      totalPrice,
      createdAt,
      status,
      paid,
      paidAt,
      customer,
      ...others
    } = this.props;

    const title = reference;

    let lastName = (customer && customer.lastName) ? customer.lastName : '';
    let char = customer ? customer.firstName.toUpperCase().charAt(0) : '';

    const createdS = new DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(createdAt);

    let paidS = ''
    if(paid){
        paidS = new DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(paidAt);
    }



    return(
      <MCard>
        <div className='card-top' style={{border: 'none'}}>
          <CardTitle className='card-title' title={title} subtitle={createdS}/>
        </div>

        <div className='cresource-info ceboarder' style={{alignItems: 'center'}}>
          <div className='total' style={{fontSize: '30px'}}>
            ${totalPrice}
            <span></span>
          </div>
        </div>

        {customer ?
          <EnhancedButton style={{textAlign: 'left'}}>
            <div className='cyield-info-flex clickable-info'>
              <span>Customer</span>
              <MAvatar className='cyield-img'
                style={{marginRight: '15px', padding: '1px 0 0 0px'}}
                size={32} cha={char} src={customer.avatarURL}/>

              <div>
                {`${customer.firstName} ${lastName}`}
                <div className='div-span'>{customer.company}</div>
              </div>
            </div>
          </EnhancedButton>
        :
          <div className='cyield-info-flex'>
            <span>Customer</span>
            <span style={{fontSize: '14px', fontWeight: '300'}}>None</span>
          </div>
        }

        <div className='cyield-info sm' style={{textTransform: 'capitalize'}}>
          <span>Status</span>
          {status}
        </div>

        {paid ?
          <div className='cyield-info sm'>
            <span>Paid At</span>
            {paidS}
          </div>
          :
          <div className='cyield-info sm'>
            <span>Paid At</span>
            <span style={{fontSize: '14px', fontWeight: '300'}}>Not Paid</span>
          </div>
        }

        {/*<CardActions className='card-actions' style={{marginTop: '8px'}}>
          <FlatButton className='action' label='Products' secondary={true}
            onTouchTap={() => {browserHistory.push('/dashboard/products')} }/>
          <FlatButton className='action' label='Inventories' secondary={true}
            onTouchTap={() => {browserHistory.push('/dashboard/inventories')} }/>
        </CardActions>*/}
      </MCard>
    )
  }
}
