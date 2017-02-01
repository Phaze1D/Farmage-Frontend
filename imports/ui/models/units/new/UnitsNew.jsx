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
import AmountChanges from '../../amount_changes/AmountChanges';
import MFade from '../../../structure/mfade/MFade';
import { factoryUnit } from '../faker/factoryUnit';





export default class UnitsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {usopen: false};
    this.handleOnClose = this.handleOnClose.bind(this);
    this.toggleUnitSelector = this.toggleUnitSelector.bind(this);

    this.unit = {}
    if(this.props.objectID){
      this.unit = factoryUnit();
    }
  }

  toggleUnitSelector(event){
    this.setState({usopen: !this.state.usopen});
  }

  handleOnClose(event){
    this.props.onCloseRight(false);
    this.setState({usopen: false});
  }

  render(){


    return(
      <MainPanel
        classes='container-fluid'
        panelID='right-drawer'
        toolbar={
          <FormActionBar onClear={this.handleOnClose} title={this.props.headerTitle}/>
        }>

        <MFade>
          <FormFields
            unit={this.unit}
            isUpdate={this.props.isUpdate}
            toggleUnitSelector={this.toggleUnitSelector}/>
        </MFade>


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


class FormFields extends React.Component{
  constructor(props){
    super(props)

    this.handleTracking = this.handleTracking.bind(this);
  }

  componentDidMount(){
    const elem = this.refs.trackWrapper;
    let trackable = this.props.unit.trackable;
    if(trackable === undefined) trackable = true;

    this.trackHeight = elem.clientHeight + 10;
    if(trackable){
      elem.style.height = `${this.trackHeight}px`
    }else{
      elem.style.height = `0px`
    }
  }

  handleTracking(event, isChecked){
    if(isChecked){
      this.refs.trackWrapper.style.height = `${this.trackHeight}px`
    }else{
      this.refs.trackWrapper.style.height = `0px`
    }
  }

  render(){
    if(this.props.unit.parentUnit) this.props.unit.parentUnit.trackable = false;

    let trackable = this.props.unit.trackable;
    if(trackable === undefined) trackable = true;

    return(
      <div className='form-fields'>
        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="name"
                type="text"
                defaultValue={this.props.unit.name}
                className="input-lg"
                hintText=""
                floatingLabelText="Sector Name"
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <TextArea
              name="description"
              type="text"
              defaultValue={this.props.unit.description}
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
          title="Track the sector's amount"
          subTitle="Trackable Sectors cannot have sub sectors"
          defaultToggled={trackable}
          onToggle={this.handleTracking}/>

        <div id="new-track-wrapper" className='track-wrapper' ref='trackWrapper'>
          <AmountChanges
            type='Unit'
            identifer={this.props.unit.name}
            isUpdate={this.props.isUpdate}
            defaultValue={this.props.unit.active}
            amountLabel='Active'/>
        </div>



        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Parent Sector" highlight={this.props.unit.parentUnit} toggleSelector={this.props.toggleUnitSelector}/>
          </div>
        </div>

        {this.props.unit.parentUnit &&
          <UnitSelected unit={this.props.unit.parentUnit}/>
        }
      </div>
    )
  }
}


let FirstChild = (props) => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
