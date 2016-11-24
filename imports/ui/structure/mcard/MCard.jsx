import React from 'react';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import classnames from 'classnames';


const MCard = (props) => {
  let classes = classnames('mcard')
  return(
    <div className={classes}>
      <IconMenu
        iconButtonElement={<IconButton className='card-options'><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Expand" leftIcon={<FullScreen />} />
        <MenuItem primaryText="Edit" leftIcon={<ImageEdit />} />
        <Divider />
        <MenuItem primaryText="Delete" leftIcon={<ActionDelete />} />
      </IconMenu>

      {props.children}
    </div>
  )
}

export default MCard;
