import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionDone from 'material-ui/svg-icons/action/done';
import ToolbarTitle from '../main_panel/ToolbarTitle';




let FormActionBar = (props) => (
  <div className='toolbar'>
    <IconButton className='form-clear-b' onTouchTap={props.onClear}>
      <ContentClear/>
    </IconButton>

    <ToolbarTitle titleID='right-drawer-ttbar'>{props.title}</ToolbarTitle>

    <IconButton className='form-done-b' onTouchTap={props.onDone}>
      <ActionDone/>
    </IconButton>
  </div>
)

export default FormActionBar;
