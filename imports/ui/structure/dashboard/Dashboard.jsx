import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ImageTune from 'material-ui/svg-icons/image/tune';

import LeftDrawer from '../left_drawer/LeftDrawer';
import MainPanel from '../main_panel/MainPanel';



export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = { lopen: false, ropen: false, fopen: false};
    this.toggleLeft = this.toggleLeft.bind(this);
  }

  toggleLeft() {
    this.setState( (prevState, props) => ({lopen: !prevState.lopen}) );
  }

  render(){
    return(
      <MainPanel
        classes='container-fluid index-panel'
        header={<IndexToolBar toggleLeft={this.toggleLeft} toggleFilter={this.toggleFilter}/>}>

        <LeftDrawer open={this.state.lopen} onRequestChange={(open) => this.setState({lopen: open})} />

        {this.props.children}

      </MainPanel>
    )
  }
}

const IndexToolBar = (props) => (
  <div className='toolbar'>
    <IconButton className='menu-button' onTouchTap={props.toggleLeft}>
      <NavigationMenu/>
    </IconButton>

    <IconButton className='search-button'>
      <ActionSearch/>
    </IconButton>

    <IconButton className='filter-button' onTouchTap={props.toggleFilter}>
      <ImageTune/>
    </IconButton>
  </div>
)
