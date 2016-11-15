import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionDone from 'material-ui/svg-icons/action/done';




let FormActionBar = (props) => (
  <div style={{width: '100%'}}>
    <IconButton className='form-clear-b' onTouchTap={props.onClear}>
      <ContentClear/>
    </IconButton>

    <IconButton className='form-done-b' onTouchTap={props.onDone}>
      <ActionDone/>
    </IconButton>
  </div>
)

export default FormActionBar;
