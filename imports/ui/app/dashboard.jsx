import React from 'react';


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

      </div>
    )
  }

}
