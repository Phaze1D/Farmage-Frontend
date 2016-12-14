import React from 'react'
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'
import EnhancedButton from 'material-ui/internal/EnhancedButton';
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
          <EnhancedButton style={{textAlign: 'left'}}>
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

        <EnhancedButton style={{textAlign: 'left', flexGrow: '1'}}>
          <div className='cyield-info sm clickable-info'>
            <span>For Unit</span>
            {unit.name}
          </div>
        </EnhancedButton>

        {/*<CardActions className='card-actions' style={{marginTop: '8px'}}>
          <FlatButton className='action' label='Receipt' secondary={true}
            onTouchTap={() => {browserHistory.push('')} }/>
        </CardActions>*/}

      </MCard>
    )
  }
}
