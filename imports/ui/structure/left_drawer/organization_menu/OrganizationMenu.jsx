import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router';


export default class OrganizationMenu extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.title){
      return(
        <div>
          <Subheader className='sub-title'>{this.props.title}</Subheader>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/customers" className='menu-link'>
              Customers
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Providers</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Sells</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Expenses</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Products</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Inventories</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Resources</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Yields</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Units</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Events</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Users</MenuItem>
        </div>
      )
    }else {
      return null;
    }
  }
}
