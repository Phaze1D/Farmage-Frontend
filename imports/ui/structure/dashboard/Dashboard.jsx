import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import LeftDrawer from '../left_drawer/LeftDrawer';
import RightDrawer from '../right_drawer/RightDrawer'
import MainPanel from '../main_panel/MainPanel';


export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = { lopen: false };
    this.toggleLeft = this.toggleLeft.bind(this);
  }

  toggleLeft() {
    this.setState({lopen: !this.state.lopen});
  }


  render() {
    return (
      <div>
        <LeftDrawer open={this.state.lopen} onRequestChange={(open) => this.setState({lopen: open})}/>

        <MainPanel>

          <RaisedButton label="Left" onTouchTap={this.toggleLeft}/>

          {this.props.children}

        </MainPanel>

      </div>
    )
  }

}
