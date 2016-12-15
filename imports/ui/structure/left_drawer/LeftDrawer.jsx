import React from 'react';
import Portal from 'react-portal';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router';
import OrganizationMenu from './organization_menu/OrganizationMenu';

export default class LeftDrawer extends React.Component{
  constructor(props){
    super(props);
    this.state = {omenu: null};
    this.handleClose = this.handleClose.bind(this);
    this.handleResetOMenu = this.handleResetOMenu.bind(this);
  }

  handleClose() {
    this.props.onRequestChange(false);
  }

  handleOMenu(title, event) {
    this.setState({omenu: title});
  }

  handleResetOMenu() {
    this.setState({omenu: null});
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
              <Link to="/dashboard/organizations" className='menu-link'>
                Organizations
              </Link>
            </MenuItem>
            <Divider/>

            <Subheader className='sub-title'>Organizations</Subheader>
            <MenuItem className="menu-item" onTouchTap={this.handleOMenu.bind(this, "Steady Path Studios")} >Steady Path Studios</MenuItem>
            <MenuItem className="menu-item" onTouchTap={this.handleOMenu.bind(this, "Granja Granada")} >Granja Granada</MenuItem>
            <Divider/>

            <OrganizationMenu title={this.state.omenu} handleClose={this.handleClose}/>

          </div>
        </Drawer>
      </Portal>
    )
  }
}
