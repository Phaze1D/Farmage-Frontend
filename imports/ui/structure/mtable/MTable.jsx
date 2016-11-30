import React from 'react';
import MAvatar from '../mavatar/MAvatar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-drop-down';

import {factoryYield} from '../../models/yields/faker/factoryYield.js'


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class MTable extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    let _yields = [];

    for(let i = 0; i < 40; i++){
        _yields.push(factoryYield());
    }

    _yields.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

    const listItems = _yields.map((_yield) => {
      const char = _yield.resource.name.toUpperCase().charAt(0);

      return(
        <tr className='hoverable' key={_yield._id}>
          <td className='bright'>{_yield._id}</td>

          <td>
            <div>
              <MAvatar className=''
                style={{marginRight: '15px', padding: '1px 0 0 0px'}}
                size={32} cha={char} src={_yield.resource.imageUrl}/>
              {_yield.resource.name}
            </div>
          </td>

          <td>{_yield.amount} <span>{_yield.resource.measurementUnit}</span></td>
          <td>{new DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric'}).format(_yield.createdAt)}</td>
          <td>{new DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric'}).format(_yield.expiresAt)}</td>
          <td>{_yield.unit.name}</td>
          <td style={{textAlign: 'right'}}>
            <IconMenu
              className=''
              iconButtonElement={<IconButton className=''><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}>

              <MenuItem primaryText="Movements" />
              <MenuItem primaryText="Inventories"/>
              <Divider />
              <MenuItem primaryText="Edit" leftIcon={<ImageEdit />} />
              <MenuItem primaryText="Delete" leftIcon={<ActionDelete />} />
            </IconMenu>
          </td>
        </tr>
      )
    });



    return (
      <table className='mtable' cellPadding="15px">
        <thead>
          <tr>
            <th className='bright'>Identifer</th>
            <th>Resource</th>
            <th>Current Amount</th>
            <th className='activec'>
              <div>
                Created Date
                <ArrowDownward/>
              </div>
            </th>
            <th>Expiration Date</th>
            <th>Unit</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {listItems}
        </tbody>

      </table>
    )
  }
}
