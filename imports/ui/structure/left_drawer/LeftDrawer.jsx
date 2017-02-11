import React from 'react';
import Portal from 'react-portal';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import ExpandDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import { Link } from 'react-router';
import OrganizationMenu from './organization_menu/OrganizationMenu';

export default class LeftDrawer extends React.Component{
  constructor(props){
    super(props);
    this.state = {subIndex: -1};
    this.handleClose = this.handleClose.bind(this);
    this.handleResetOMenu = this.handleResetOMenu.bind(this);
  }

  handleClose() {
    this.props.onRequestChange(false);
  }

  handleOMenu(index, event) {
    if(this.state.subIndex == index){
      this.setState({subIndex: -1})
    }else{
      this.setState({subIndex: index})
    }

  }

  handleResetOMenu() {
    this.handleClose();
  }

  render(){
    return(
      <Portal isOpened={true}>
        <Drawer className="left-drawer" open={this.props.open} docked={false} onRequestChange={this.props.onRequestChange} >
          <div className="upper">

          </div>

          <div className="mid">
            <MenuItem className="menu-item" onTouchTap={this.handleResetOMenu}>
              <Link to="/dashboard" className='menu-link' style={{textTransform: 'uppercase'}}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem className="menu-item" onTouchTap={this.handleResetOMenu}>
              <Link to="/dashboard/organizations" className='menu-link' style={{textTransform: 'uppercase'}}>
                Organizations
              </Link>
            </MenuItem>
            <Divider/>

            <Subheader className='sub-title'>Organizations</Subheader>
            <MenuItem
              rightIcon={<ExpandDown style={{transform: this.state.subIndex == 0 ? 'rotate(180deg)': 'rotate(0deg)'}} className='menu-svg'/>}
              className="menu-item"
              onTouchTap={this.handleOMenu.bind(this, 0)}>
              Steady Path Studios
            </MenuItem>

            <OrganizationMenu open={this.state.subIndex == 0} handleClose={this.handleClose}/>

            <MenuItem
              rightIcon={<ExpandDown style={{transform: this.state.subIndex == 1 ? 'rotate(180deg)': 'rotate(0deg)'}} className='menu-svg'/>}
              className="menu-item"
              onTouchTap={this.handleOMenu.bind(this, 1)}>
              Granja Granada
            </MenuItem>

            <OrganizationMenu open={this.state.subIndex == 1} handleClose={this.handleClose}/>



          </div>
        </Drawer>
      </Portal>
    )
  }
}
