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
            <Link to="/customers" className='menu-link'>
              Customers
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/providers" className='menu-link'>
              Providers
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/sells" className='menu-link'>
              Sales
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/expenses" className='menu-link'>
              Expenses
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/products" className='menu-link'>
              Products
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/inventories" className='menu-link'>
              Inventories
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/resources" className='menu-link'>
              Resources
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/yields" className='menu-link'>
              Yields
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/units" className='menu-link'>
              Units
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/movements" className='menu-link'>
              Movements
            </Link>
          </MenuItem>

          <MenuItem className="menu-item" onTouchTap={this.props.handleClose}>
            <Link to="/ousers" className='menu-link'>
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
