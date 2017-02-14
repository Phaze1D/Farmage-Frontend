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
              <Link to="/dashboard" className='menu-link'>
                Profile
              </Link>
            </MenuItem>
            <MenuItem className="menu-item" onTouchTap={this.handleResetOMenu}>
              <Link to="/organizations" className='menu-link'>
                Organizations
              </Link>
            </MenuItem>
            <Divider/>

            <Subheader className='sub-title'>Organizations</Subheader>


            <OrganizationMenu
              mainTitle='Steady Path Studios'
              onTopTap={this.handleOMenu.bind(this, 0)}
              open={this.state.subIndex == 0}
              handleClose={this.handleClose}/>

            <OrganizationMenu
              mainTitle='Granja Granda'
              onTopTap={this.handleOMenu.bind(this, 1)}
              open={this.state.subIndex == 1}
              handleClose={this.handleClose}/>

            <OrganizationMenu
              mainTitle='MixMax'
              onTopTap={this.handleOMenu.bind(this, 2)}
              open={this.state.subIndex == 2}
              handleClose={this.handleClose}/>



          </div>
        </Drawer>
      </Portal>
    )
  }
}
