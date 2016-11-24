import React from 'react';
import classnames from 'classnames';


const MCard = (props) => {
  let classes = classnames('mcard')
  return(
    <div className={classes}>
      {props.children}
    </div>
  )
}

export default MCard;
