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
import ToolbarTitle from '../main_panel/ToolbarTitle';
import MDialog from '../mdialog/MDialog';
import MSearch from '../msearch/MSearch';
import MFAB from './MFAB';



export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = { lopen: false, ropen: false, fopen: false, sopen: false, showMFAB: this.props.showMFAB};
    this.toggleLeft = this.toggleLeft.bind(this);
    this.toggleRight = this.toggleRight.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.hideFAB = this.hideFAB.bind(this);
    this.showFAB = this.showFAB.bind(this);
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

  hideFAB(){
    let mfab = document.getElementsByClassName('fab')[0]
    let mfabUnit = document.getElementsByClassName('fab-unit-toggle ')[0]
    if(mfabUnit) mfabUnit.className = 'fab-unit-toggle leave-fab leave-fab-active'
    mfab.className = 'fab leave-fab leave-fab-active'
  }

  showFAB(){
    let mfab = document.getElementsByClassName('fab')[0]
    let mfabUnit = document.getElementsByClassName('fab-unit-toggle ')[0]
    if(mfabUnit) mfabUnit.className = 'fab-unit-toggle enter-fab enter-fab-active'
    mfab.className = 'fab enter-fab enter-fab-active'
  }

  render(){

    const toolbar = <IndexToolBar
      title={this.props.headerTitle}
      toggleLeft={this.toggleLeft}
      toggleFilter={this.toggleFilter}
      toggleSearch={this.toggleSearch}/>;

    return(
      <MainPanel
        panelID='dashboard'
        key='dashboard-main-panel'
        classes='container-fluid index-panel'
        toolbar={toolbar}
        onRequestHide={this.hideFAB}
        onRequestShow={this.showFAB}>

        <Portal isOpened={true}>
          <MSearch
            showOverlay={true}
            open={this.state.sopen}
            onRequestChange={this.toggleSearch}/>
        </Portal>


        <LeftDrawer open={this.state.lopen} onRequestChange={(open) => this.setState({lopen: open})} />

        {this.props.children}

        <MFAB show={this.state.showMFAB} onClicked={this.toggleRight}/>

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

    <ToolbarTitle titleID='dashboard-ttbar'>{props.title}</ToolbarTitle>

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
