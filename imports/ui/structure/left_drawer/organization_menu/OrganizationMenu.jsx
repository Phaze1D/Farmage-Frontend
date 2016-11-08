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

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/providers" className='menu-link'>
              Providers
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Sells</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Expenses</MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/products" className='menu-link'>
              Products
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Inventories</MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/resources" className='menu-link'>
              Resources
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Yields</MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/units" className='menu-link'>
              Units
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Movements</MenuItem>
          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Users</MenuItem>
        </div>
      )
    }else {
      return null;
    }
  }
}
