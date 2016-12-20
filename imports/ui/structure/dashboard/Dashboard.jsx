import React from 'react';
import Portal from 'react-portal';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ImageTune from 'material-ui/svg-icons/image/tune';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


import LeftDrawer from '../left_drawer/LeftDrawer';
import RightDrawer from '../right_drawer/RightDrawer';
import MainPanel from '../main_panel/MainPanel';
import MDialog from '../mdialog/MDialog';
import MSearch from '../msearch/MSearch';
import MFAB from './MFAB';



export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = { lopen: false, ropen: false, fopen: false, sopen: false};
    this.toggleLeft = this.toggleLeft.bind(this);
    this.toggleRight = this.toggleRight.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  toggleLeft() {
    this.setState( (prevState, props) => ({lopen: !prevState.lopen}) );
  }

  toggleRight() {
    this.setState( (prevState, props) => ({ropen: !prevState.ropen}) );
  }

  toggleFilter() {
    this.setState( (prevState, props) => ({fopen: !prevState.fopen}) );
  }

  toggleSearch() {
    this.setState( (prevState, props) => ({sopen: !prevState.sopen}) );
  }

  render(){

    const header = <IndexToolBar toggleLeft={this.toggleLeft} toggleFilter={this.toggleFilter} toggleSearch={this.toggleSearch}/>;

    return(
      <MainPanel
        key='dashboard-main-panel'
        classes='container-fluid index-panel'
        header={header}>

        <Portal isOpened={true}>
          <MSearch
            showOverlay={true}
            open={this.state.sopen}
            onRequestChange={this.toggleSearch}/>
        </Portal>


        <LeftDrawer open={this.state.lopen} onRequestChange={(open) => this.setState({lopen: open})} />

        {this.props.children}

        <MFAB show={this.props.showMFAB} onClicked={this.toggleRight}/>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          {React.cloneElement(this.props.right, { onCloseRight: this.toggleRight })}
        </RightDrawer>

        <FilterDialog open={this.state.fopen} onRequestClose={this.toggleFilter}>
          {this.props.filter}
        </FilterDialog>

      </MainPanel>
    )
  }
}

const IndexToolBar = (props) => (
  <div className='toolbar'>
    <IconButton className='menu-button' onTouchTap={props.toggleLeft}>
      <NavigationMenu/>
    </IconButton>

    <IconButton className='search-button' onTouchTap={props.toggleSearch}>
      <ActionSearch/>
    </IconButton>

    <IconButton className='filter-button' onTouchTap={props.toggleFilter}>
      <ImageTune/>
    </IconButton>
  </div>
)

const FilterDialog = (props) => {

  const actions = [
    <FlatButton
      key='cancel'
      label="Cancel"
      secondary={true}
      keyboardFocused={false}
      onTouchTap={props.onRequestClose}
    />,
    <FlatButton
      key='apply'
      label="Apply"
      secondary={true}
      keyboardFocused={false}
      onTouchTap={props.onRequestClose}
    />
  ];

  return(
    <MDialog
    title="Filters"
    actions={actions}
    open={props.open}
    onRequestClose={props.onRequestClose}>

      {props.children}
    </MDialog>
  )
}
