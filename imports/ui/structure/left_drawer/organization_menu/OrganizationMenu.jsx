import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router';
import classnames from 'classnames'


export default class OrganizationMenu extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const exClass = classnames('sub-menu-expandable', {'open': this.props.open})
    return(
      <div className={exClass}>
        <div className='sub-menu'>
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
            <Link to="/batches" className='menu-link'>
              Batches
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
              Sectors
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
      </div>
    )
  }
}
