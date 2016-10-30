import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import LeftDrawer from '../left_drawer/LeftDrawer';
import RightDrawer from '../right_drawer/RightDrawer'
import MainPanel from '../main_panel/MainPanel'


export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      lopen: false,
      ropen: false
    };
    this.toggleLeft = this.toggleLeft.bind(this);
    this.toggleRight = this.toggleRight.bind(this);
  }

  toggleLeft() {
    this.setState({lopen: !this.state.lopen});
  }

  toggleRight() {
    this.setState({ropen: !this.state.ropen});
  }


  render() {
    return (
      <div>
        <LeftDrawer open={this.state.lopen} onRequestChange={(open) => this.setState({lopen: open})}/>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>

        </RightDrawer>

        <MainPanel>

          <RaisedButton label="Left" onTouchTap={this.toggleLeft}/>
          <RaisedButton label="Right" onTouchTap={this.toggleRight} />

        </MainPanel>

      </div>
    )
  }

}
