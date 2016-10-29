import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import RightDrawer from '../right_drawer/RightDrawer'


export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dopen: false,
      ropen: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleRight = this.toggleRight.bind(this);
  }

  toggleDrawer() {
    this.setState({dopen: !this.state.dopen});
  };

  toggleRight() {
    this.setState({ropen: !this.state.ropen})
  }


  render() {
    return (
      <div>
        <Drawer open={this.state.dopen}>

        </Drawer>

        <RightDrawer open={this.state.ropen}>

        </RightDrawer>

        <RaisedButton label="Drawer" onTouchTap={this.toggleDrawer}/>
        <RaisedButton label="Right" onTouchTap={this.toggleRight} />

      </div>
    )
  }

}
