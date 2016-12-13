import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ImageTune from 'material-ui/svg-icons/image/tune';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import uuid from 'uuid';
import classnames from 'classnames';

import RaisedButton from 'material-ui/RaisedButton';
import LeftDrawer from '../left_drawer/LeftDrawer';
import RightDrawer from '../right_drawer/RightDrawer'
import MainPanel from '../main_panel/MainPanel';


export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = { lopen: false, ropen: false, docked: true, dfopen: false};
    this.toggleLeft = this.toggleLeft.bind(this);
    this.toggleRight = this.toggleRight.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleLeft() {
    this.setState( (prevState, props) => ({lopen: !prevState.lopen}) );
  }

  toggleRight() {
    this.setState( (prevState, props) => ({ropen: !prevState.ropen}) );
  }

  toggleFilter() {
    this.setState( (prevState, props) => ({dfopen: !prevState.dfopen}) );
  }


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        keyboardFocused={false}
        onTouchTap={this.toggleFilter}
      />,
      <FlatButton
        label="Apply"
        secondary={true}
        keyboardFocused={false}
        onTouchTap={this.toggleFilter}
      />
    ];


    return (
      <div>
        <LeftDrawer open={this.state.lopen} onRequestChange={(open) => this.setState({lopen: open})}/>

        <MainPanel
          classes='container-fluid index-panel'
          header={<IndexToolBar toggleLeft={this.toggleLeft} toggleFilter={this.toggleFilter}/>}>

          {this.props.main}

        </MainPanel>

        {this.props.right &&
          <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
            {this.props.right}
          </RightDrawer>
        }

        <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'enter-fab',
            leave: 'leave-fab',
            appear: 'appear-fab'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={400}>
            {this.props.right &&
              <FloatingActionButton key='fab-main'  secondary={true} onTouchTap={this.toggleRight} className="fab">
                <ContentAdd className="icon"/>
              </FloatingActionButton>
            }
        </ReactCSSTransitionGroup>

        <Dialog
          title="Filters"
          actions={actions}
          modal={false}
          contentClassName='filter-dialog'
          bodyClassName='body-d'
          autoScrollBodyContent={true}
          open={this.state.dfopen}
          onRequestClose={this.toggleFilter}
        >
          {this.props.filter}
        </Dialog>

      </div>
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
