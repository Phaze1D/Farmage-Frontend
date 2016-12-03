import React from 'react'
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'
import MAvatar from '../../../structure/mavatar/MAvatar';
import MCard from '../../../structure/mcard/MCard';

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class ExpenseCard extends React.Component{
  constructor(props){
    super(props);
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

    const title = itemName;
    let lastName = (provider && provider.lastName) ? provider.lastName : '';
    let char = provider ? char = provider.firstName.toUpperCase().charAt(0) : '';

    const totalPrice = (unitPrice * quantity).toFixed(2);
    const createdS = new DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(createdAt);



    return(
      <MCard>
        <div className='card-top' style={{border: 'none'}}>
          <CardTitle className='card-title' title={title} subtitle={createdS}/>
        </div>

        <div className='cresource-info ceboarder' style={{alignItems: 'center'}}>
          <div className='total' style={{fontSize: '30px'}}>
            -${totalPrice}
            <span></span>
          </div>
        </div>

        {provider ?
          <div className='cyield-info-flex'>
            <span>Provider</span>
            <MAvatar className='cyield-img'
              style={{marginRight: '15px', padding: '1px 0 0 0px'}}
              size={32} cha={char} src={provider.avatarURL}/>

            <div>
              {`${provider.firstName} ${lastName}`}
              <span style={{flexGrow: '0'}}>{provider.company}</span>
            </div>
          </div>
        :
          <div className='cyield-info-flex'>
            <span>Provider</span>
            <span style={{fontSize: '14px', fontWeight: '300'}}>None</span>
          </div>
        }

        <div className='cyield-info' style={{flexGrow: '1'}}>
          <span>For Unit</span>
          {unit.name}
        </div>

        <CardActions className='card-actions' style={{marginTop: '8px'}}>
          <FlatButton className='action' label='Receipt' secondary={true}
            onTouchTap={() => {browserHistory.push('')} }/>
        </CardActions>

      </MCard>
    )
  }
}
