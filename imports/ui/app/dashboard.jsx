import React from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';

export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      active: false
    };
    this.drawerToggle = this.drawerToggle.bind(this);
  }

  drawerToggle() {
    this.setState({active: !this.state.active});
  };


  render() {
    return (
      <div>
        <Button label='Show Drawer' raised accent onClick={this.drawerToggle} />
        <Drawer active={this.state.active} onOverlayClick={this.drawerToggle} theme={theme}>
          <h5>This is your Drawer.</h5>
        </Drawer>
      </div>

    )
  }

}
