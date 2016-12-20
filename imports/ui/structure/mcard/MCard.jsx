import React from 'react';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling'
import classnames from 'classnames';

import MPopoverAnimation from '../manimation/MPopoverAnimation';



export default class MCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {optionsShown: false}
  }

  render(){
    const classes = classnames('mcard', this.props.className)
    return(
      <div className={classes}>
        <IconMenu
          open={this.state.optionsShown}
          className='card-option-root'
          animation={MPopoverAnimation}
          onRequestChange={(open) => this.setState({optionsShown: open})}
          iconButtonElement={<IconButton className='card-options'><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>


          <MenuItem primaryText="Expand" leftIcon={<FullScreen />} />
          <MenuItem primaryText="Edit" leftIcon={<ImageEdit />} />
          <Divider />
          <MenuItem primaryText="Delete" leftIcon={<ActionDelete />} />
        </IconMenu>

        <AutoLockScrolling lock={this.state.optionsShown}/>

        {this.props.children}
      </div>
    )
  }
}
