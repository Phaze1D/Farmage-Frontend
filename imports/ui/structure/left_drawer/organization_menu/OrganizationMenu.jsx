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

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/sells" className='menu-link'>
              Sells
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/expenses" className='menu-link'>
              Expenses
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/products" className='menu-link'>
              Products
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/inventories" className='menu-link'>
              Inventories
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/resources" className='menu-link'>
              Resources
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/yields" className='menu-link'>
              Yields
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/units" className='menu-link'>
              Units
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>Movements</MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/dashboard/ousers" className='menu-link'>
              Users
            </Link>
          </MenuItem>
        </div>
      )
    }else {
      return null;
    }
  }
}
