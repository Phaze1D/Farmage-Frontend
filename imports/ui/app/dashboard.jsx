import React from 'react';
import {Drawer} from 'react-toolbox/lib/drawer';
import {Button} from 'react-toolbox/lib/button';

console.log(Button);

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
        <Button label='Show Drawer' raised accent onClick={this.drawerToggle} className='button'/>
        <Drawer active={this.state.active} onOverlayClick={this.drawerToggle}>
          <h5>This is your Drawer.</h5>
        </Drawer>
      </div>

    )
  }

}
