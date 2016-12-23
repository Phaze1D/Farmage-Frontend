import React from 'react';
import Portal from 'react-portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import classnames from 'classnames';

import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import SelectorButton from '../../../structure/selector_button/SelectorButton';
import LToggler from '../../../structure/ltoggler/LToggler';
import UnitSelected from '../selector_items/UnitSelected';
import UnitSelectorList from '../selector_items/UnitSelectorList';





export default class UnitsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {tracking: true, height: 'auto', usopen: false};
    this.handleTracking = this.handleTracking.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.toggleUnitSelector = this.toggleUnitSelector.bind(this);
  }

  componentDidMount(){
    const elem = document.getElementById("new-track-wrapper");
    this.trackHeight = elem.clientHeight + 10;
    this.setState({height: this.trackHeight + 'px'});
  }

  toggleUnitSelector(event){
    this.setState({usopen: !this.state.usopen});
  }

  handleTracking(event, isChecked){
    this.setState({tracking: isChecked})
    if(isChecked){
      this.setState({height: this.trackHeight + 'px'});
    }else{
      this.setState({height: 0});
    }
  }

  handleOnClose(event){
    this.props.onCloseRight(false);
    this.setState({usopen: false});
  }

  render(){
    const tStyle = {height: this.state.height}


    return(
      <MainPanel
        classes='container-fluid'
        title='New Unit'
        targetScroll='right-drawer'
        header={
          <FormActionBar onClear={this.handleOnClose}/>
        }>

        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="name"
                type="text"
                className="input-lg"
                hintText=""
                floatingLabelText="Unit Name"
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <TextArea
              name="description"
              type="text"
              className=""
              floatingLabelText="Description"
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>
        </div>


        <LToggler
          title="Track the unit's amount"
          subTitle="Trackable Units cannot have sub-units"
          defaultToggled={this.state.tracking}
          onToggle={this.handleTracking}/>

        <div id="new-track-wrapper" className='track-wrapper' style={tStyle}>
          <div className="row row-flex">
            <div className='col-xs-8 sm-p-right'>
              <TextArea
                name="description"
                type="text"
                defaultValue="Initial amount"
                floatingLabelText="Movement Notes"
                fullWidth={true}
                multiLine={true}
                showCount={true}
                maxCount={512}
                disabled={!this.state.tracking}
                rows={1} />
            </div>

            <div className='col-xs-4 sm-p-left'>
              <TextField
                  name="amount"
                  type="number"
                  defaultValue="1"
                  hintText=""
                  floatingLabelText="Active"
                  disabled={!this.state.tracking}
                  fullWidth={true}/>
            </div>
          </div>
        </div>


        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Parent Unit" highlight={true} toggleSelector={this.toggleUnitSelector}/>
          </div>
        </div>

      <UnitSelected/>

      <Portal isOpened={true}>
        <ReactCSSTransitionGroup component={FirstChild}
        transitionName={ {
          enter: 'enter-selector-list',
          leave: 'leave-selector-list',
          appear: 'appear-selector-list'
        } }
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
        transitionAppear={true}
        transitionAppearTimeout={400}>

        {this.state.usopen &&
          <UnitSelectorList key='us' onRequestChange={this.toggleUnitSelector} onlyOne={true}/>
        }

        </ReactCSSTransitionGroup>
      </Portal>

      </MainPanel>
    )
  }
}

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
