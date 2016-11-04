import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import RaisedButton from 'material-ui/RaisedButton';
import LeftDrawer from '../left_drawer/LeftDrawer';
import RightDrawer from '../right_drawer/RightDrawer'
import MainPanel from '../main_panel/MainPanel';


export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = { lopen: false, ropen: false };
    this.toggleLeft = this.toggleLeft.bind(this);
    this.toggleRight = this.toggleRight.bind(this);

  }

  toggleLeft() {
    this.setState( (prevState, props) => ({lopen: !prevState.lopen}) );
  }

  toggleRight() {
    this.setState( (prevState, props) => ({ropen: !prevState.ropen}) );
  }


  render() {
    return (
      <div>
        <LeftDrawer open={this.state.lopen} onRequestChange={(open) => this.setState({lopen: open})}/>

        <MainPanel>

          <RaisedButton label="Left" onTouchTap={this.toggleLeft}/>

          {this.props.main}

        </MainPanel>

        
        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          {this.props.right}
        </RightDrawer>

        <FloatingActionButton onTouchTap={this.toggleRight} className="fab">
          <ContentAdd className="icon"/>
        </FloatingActionButton>

      </div>
    )
  }

}
