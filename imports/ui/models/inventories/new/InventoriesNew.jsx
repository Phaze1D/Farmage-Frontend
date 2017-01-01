import React from 'react';
import Portal from 'react-portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';
import Toggle from 'material-ui/Toggle';
import classnames from 'classnames';

import SelectorButton from '../../../structure/selector_button/SelectorButton';
import MainPanel from '../../../structure/main_panel/MainPanel';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import TextArea from '../../../structure/textarea/TextArea';
import ProductInvItem from '../../products/selector_items/ProductInvItem';
import YieldInvItem from '../../yields/selector_items/YieldInvItem';
import ProductsSelectorList from '../../products/selector_items/ProductsSelectorList';
import YieldsSelectorList from '../../yields/selector_items/YieldsSelectorList';
import {randomImageColor} from '../../../structure/app/RandomColor.js';


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class InventoriesNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {minDate: new Date(), psopen: false, ysopen: false}
    this.handleOnClose = this.handleOnClose.bind(this);
    this.productRandomColor = randomImageColor();

    this.toggleProductSelector = this.toggleProductSelector.bind(this);
    this.toggleYieldSelector = this.toggleYieldSelector.bind(this);

  }

  handleOnClose(event){
    this.setState({psopen: false, ysopen: false});
    this.props.onCloseRight(false);
  }

  toggleYieldSelector(event){
    this.setState({ysopen: !this.state.ysopen, psopen: false});
  }

  toggleProductSelector(event){
    this.setState({psopen: !this.state.psopen, ysopen: false});
  }

  render(){

    return(
      <MainPanel
        classes='container-fluid'
        panelID='right-drawer'
        toolbar={
          <FormActionBar onClear={this.handleOnClose} title='New Inventory'/>
        }>

        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="name"
                type="text"
                className="input-lg"
                hintText=""
                floatingLabelText="Identifier"
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-6 sm-p-right'>
            <DatePicker
              name="date_bought"
              floatingLabelText="Created Date"
              fullWidth={true}
              onChange={ (event, date) => {this.setState({minDate: date}) } }
              defaultDate={new Date()}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }).format} />
          </div>

          <div className='col-xs-6 sm-p-left'>
            <DatePicker
              name="expiration_date"
              minDate={this.state.minDate}
              floatingLabelText="Expiration Date"
              fullWidth={true}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }).format} />
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <TextArea
              name="notes"
              type="text"
              className=""
              floatingLabelText="Notes"
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>
        </div>

        <div className="row">
          <div className='col-xs-8 sm-p-right'  >
            <TextArea
              name="movement_note"
              type="text"
              className=""
              defaultValue="Initial amount"
              floatingLabelText="Movement Notes"
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>

          <div className='col-xs-4 sm-p-left'>
            <TextField
                name="amount"
                type="number"
                defaultValue="0"
                hintText=""
                floatingLabelText="Amount"
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Product" highlight={true} toggleSelector={this.toggleProductSelector}/>
          </div>
        </div>

        <ProductInvItem backgroundColor={this.productRandomColor}/>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Resource Yields" showImage={true} highlight={true} toggleSelector={this.toggleYieldSelector}/>
          </div>
        </div>

        <YieldInvItem/>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Resource Yields" showImage={true} highlight={true} toggleSelector={this.toggleYieldSelector}/>
          </div>
        </div>

        <YieldInvItem/>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Resource Yields" showImage={true} highlight={true} toggleSelector={this.toggleYieldSelector}/>
          </div>
        </div>

        <YieldInvItem/>

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

          {this.state.psopen &&
            <ProductsSelectorList key='ps' onRequestChange={this.toggleProductSelector} onlyOne={true}/>
          }

          </ReactCSSTransitionGroup>
        </Portal>

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

          {this.state.ysopen &&
            <YieldsSelectorList key='ys' onRequestChange={this.toggleYieldSelector} title='Resource Yields' onlyOne={false}/>
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
