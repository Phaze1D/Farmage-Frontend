import React from 'react';
import Avatar from 'material-ui/Avatar';
import {randomImageColor, alphaImageColor} from '../app/RandomColor.js';


const MAvatar = (props) => {
  const {
    cha,
    ...avatarProps
  } = props;

  if(props.src && props.src.length > 0){
    avatarProps.style.padding = ''
    return(
      <Avatar {...avatarProps}/>
    )
  }else{
    return(
      <Avatar {...avatarProps} backgroundColor={alphaImageColor(cha)}>{cha}</Avatar>
    )
  }
}




export default MAvatar;
