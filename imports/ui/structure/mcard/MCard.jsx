import React from 'react';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';
import classnames from 'classnames';

import MPopoverAnimation from '../manimation/MPopoverAnimation';
import MShow from '../mshow/MShow';



export default class MCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {optionsShown: false, showCard: false}
    this.showStyle = {}
    this.handleOnExpand = this.handleOnExpand.bind(this);
  }

  handleOnExpand(event){
    let pos = event.currentTarget.closest('.mcard').getBoundingClientRect();
    console.log(pos);
    const height = pos.bottom - pos.top;
    const width = pos.right - pos.left;
    this.showStyle = {
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      transformOrigin: `${pos.left}px ${height/2 + pos.top}px`,
      transform: `scale(${width/ window.innerWidth }, ${height / window.innerHeight})`
    }
    this.setState({showCard: true})
    console.log(this.showStyle);

    // setTimeout(() => {
    //   this.showStyle = {
    //     top: 0,
    //     left: 0,
    //     width: '100%',
    //     height: '100vh',
    //     transformOrigin: `${pos.left * (0.3125 + 1)}px 100px`,
    //     transform: `scale(1, 1)`
    //   }
    //   this.setState({showCard: true})
    // }, 300)
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


          {this.props.options}
        </IconMenu>

        <AutoLockScrolling lock={this.state.optionsShown || this.state.showCard}/>

        {this.props.children}

        <MShow open={this.state.showCard} openStyle={this.showStyle}>

        </MShow>

      </div>
    )
  }
}
