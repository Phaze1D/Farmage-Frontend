import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

export default class LeftDrawer extends React.Component{
  constructor(props){
    super(props);
    this.state = {omenu: null};
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.onRequestChange(false);
  }

  handleOMenu(title, event) {
    this.setState({omenu: title});
  }


  organizationMenu(omenu) {
    if(omenu){
      return(
        <div>
          <Subheader className='sub-title'>{omenu} Menu</Subheader>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Customers</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Providers</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Sells</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Expenses</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Products</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Inventories</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Resources</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Yields</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Units</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Events</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Users</MenuItem>
        </div>
      )
    }
  }

  render(){
    return(
      <Drawer className="left-drawer" open={this.props.open} docked={false} onRequestChange={this.props.onRequestChange} >
        <div className="upper">

        </div>

        <div className="mid">
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Profile</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleClose}>Organizations</MenuItem>
          <Divider/>

          <Subheader className='sub-title'>Organizations</Subheader>
          <MenuItem className="menu-item" onTouchTap={this.handleOMenu.bind(this, "Steady Path Studios")} >Steady Path Studios</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.handleOMenu.bind(this, "Granja Granada")} >Granja Granada</MenuItem>
          <Divider/>

          {this.organizationMenu(this.state.omenu)}

        </div>
      </Drawer>

    )
  }
}
