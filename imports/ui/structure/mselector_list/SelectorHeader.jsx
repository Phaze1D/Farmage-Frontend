import React from 'react';
import EventListener, {withOptions} from 'react-event-listener';
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
    this.state = {sopen: false, mopen: false, showShadow: false}

    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  toggleSearch() {
    this.setState( (prevState, props) => ({sopen: !prevState.sopen}) );
  }

  handleScroll(event){
    if(event.target.scrollTop === 0 && this.state.showShadow){
      this.setState({showShadow: false});
    }

    if(event.target.scrollTop !== 0 && !this.state.showShadow){
      this.setState({showShadow: true});
    }
  }

  render(){
    const style = {}
    if(!this.state.showShadow || this.state.sopen){
      style.boxShadow = 'none'
    }

    const sortByItems = this.props.sortBy.map((primaryText) =>
      <MenuItem key={primaryText} primaryText={primaryText} rightIcon={<ArrowUp />}/>
    )

    return(
      <div className='list-header' style={style}>

        <EventListener
          target={this.props.vID}
          onScroll={withOptions(this.handleScroll, {passive: true, capture: false})}
        />

        <IconButton className='lheader-b' onTouchTap={this.props.backTouched}>
          <ArrowBack/>
        </IconButton>

        <div className='ltitle'>
          {this.props.title}
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
          {sortByItems}

        </IconMenu>

        <MSearch
          backIcon={<ContentClear/>}
          showOverlay={false}
          open={this.state.sopen}
          onRequestChange={this.toggleSearch}/>

      </div>
    )
  }
}

const handleRadioGroup = function(event, key){
  event.stopPropagation();
  key = this.state.keyChecked === key ? null : key;
  this.setState({keyChecked: key});
}

exports.handleRadioGroup = handleRadioGroup;
