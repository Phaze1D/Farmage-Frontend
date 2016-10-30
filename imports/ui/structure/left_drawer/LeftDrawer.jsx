import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class LeftDrawer extends React.Component{
  constructor(props){
    super(props);
  }



  render(){
    return(
      <Drawer className="left-drawer" open={this.props.open} docked={false} onRequestChange={this.props.onRequestChange} >
        <div className="upper">

        </div>
        <div className="mid">

          {/*
            Organizations



          */}
        </div>
      </Drawer>

    )
  }
}
