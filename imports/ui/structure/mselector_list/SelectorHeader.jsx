import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentClear from 'material-ui/svg-icons/content/clear';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ImageTune from 'material-ui/svg-icons/image/tune';
import Camera from 'material-ui/svg-icons/image/camera-alt';
import ArrowUp from 'material-ui/svg-icons/action/trending-up';
import ArrowDown from 'material-ui/svg-icons/action/trending-down';

import MSearch from '../msearch/MSearch';
import MPopoverAnimation from '../manimation/MPopoverAnimation';


export default class SelectorHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = {sopen: false, mopen: false}

    this.toggleSearch = this.toggleSearch.bind(this);
  }

  toggleSearch() {
    this.setState( (prevState, props) => ({sopen: !prevState.sopen}) );
  }

  render(){

    return(
      <div className='list-header'>
        <IconButton className='lheader-b' onTouchTap={this.props.backTouched}>
          <ArrowBack/>
        </IconButton>

        <div className='ltitle'>

        </div>

        <IconButton className='lheader-b' onTouchTap={this.toggleSearch}>
          <ActionSearch/>
        </IconButton>

        <IconMenu
          iconButtonElement={
            <IconButton className='lheader-b'>
              <ImageTune/>
            </IconButton>
          }
          animation={MPopoverAnimation}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>

          <MenuItem primaryText="Scan Code" leftIcon={<Camera />}/>
          <Divider/>
          <Subheader>Sort By</Subheader>
          <MenuItem primaryText="Name" rightIcon={<ArrowUp />}/>
          <MenuItem primaryText="Measurement Unit" rightIcon={<ArrowUp />}/>

        </IconMenu>

        <MSearch
          backIcon={<ContentClear/>}
          barStyle={{boxShadow: 'none'}}
          showOverlay={false}
          open={this.state.sopen}
          onRequestChange={this.toggleSearch}/>

      </div>
    )
  }
}
