import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MAvatar from '../../../structure/mavatar/MAvatar';



export default class ResourceItem extends React.Component{
  constructor(props){
    super(props)
    this.state = {checked: false}

    this.toggleChecked = this.toggleChecked.bind(this);
  }

  toggleChecked(event){
    this.setState({checked: !this.state.checked})
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

    return(
      <div className='sitem' onTouchTap={this.toggleChecked}>
        <Checkbox checked={this.state.checked} className='schecker'/>
        <div className='slinfo'>
          {title}
          <span>{measurementUnit}</span>
        </div>

        <MAvatar className=''
          style={{marginRight: '15px', padding: '1px 0 0 0px'}}
          size={42} cha={char} src={imageUrl}/>
      </div>
    )
  }
}
