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
import AmountChanges from '../../amount_changes/AmountChanges';
import {factoryBatch} from '../faker/factoryBatch';


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class BatchesNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {psopen: false, ysopen: false, showFields: false, yTitle: ''}
    this.handleOnClose = this.handleOnClose.bind(this);

    this.toggleProductSelector = this.toggleProductSelector.bind(this);
    this.toggleYieldSelector = this.toggleYieldSelector.bind(this);

    this.batch = {}
    if(this.props.objectID){
      this.batch = factoryBatch();
    }
  }

  componentDidMount(){
    setTimeout(() => {this.setState({showFields: true})}, 550)
  }

  handleOnClose(event){
    this.setState({psopen: false, ysopen: false});
    this.props.onCloseRight(false);
  }

  toggleYieldSelector(event, title){
    if(this.state.yTitle === title || title === undefined){
      this.setState({ysopen: !this.state.ysopen, psopen: false});
    }else if(this.state.ysopen){
      this.setState({yTitle: title})
    }else{
      this.setState({yTitle: title, ysopen: true, psopen: false});
    }
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
          <FormActionBar onClear={this.handleOnClose} title={this.props.headerTitle}/>
        }>

        <ReactCSSTransitionGroup component={FirstChild}
        transitionName={ {
          enter: 'enter-fade',
          leave: 'leave-fade',
          appear: 'appear-fade'
        } }
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
        transitionAppearTimeout={500}>
          {this.state.showFields &&
            <FormFields
              isUpdate={this.props.isUpdate}
              batch={this.batch}
              toggleYieldSelector={this.toggleYieldSelector}
              toggleProductSelector={this.toggleProductSelector}/>
          }
        </ReactCSSTransitionGroup>



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
            <YieldsSelectorList key='ys' onRequestChange={this.toggleYieldSelector} title={this.state.yTitle} onlyOne={false}/>
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
    this.state = {minDate: this.props.batch.createdAt ? this.props.batch.createdAt : new Date()}

  }

  render(){
    const identifer = this.props.batch.identifer ? this.props.batch.identifer : this.props.batch._id;


    let resourceList = []

    if(this.props.batch && this.props.batch.product){
      resourceList = this.props.batch.product.resources.map((resource) =>
        <YieldInvItem
          key={resource._id}
          resource={resource}
          toggleYieldSelector={this.props.toggleYieldSelector}/>
      )
    }


    return(
      <div>
        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="name"
                type="text"
                className="input-lg"
                hintText=""
                defaultValue={identifer}
                floatingLabelText="Identifier"
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-6 sm-p-right'>
            <DatePicker
              name="createdAt"
              floatingLabelText="Created Date"
              fullWidth={true}
              onChange={ (event, date) => {this.setState({minDate: date}) } }
              defaultDate={this.props.batch.createdAt ? this.props.batch.createdAt : new Date()}
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
              defaultValue={this.props.batch.notes}
              className=""
              floatingLabelText="Notes"
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>
        </div>

        <AmountChanges
          type='Batch'
          identifer={identifer}
          isUpdate={this.props.isUpdate}
          defaultValue={this.props.batch.amount}
          amountLabel='Amount'/>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Product" highlight={this.props.batch.product} toggleSelector={this.props.toggleProductSelector}/>
          </div>
        </div>

        {this.props.batch.product &&
          <ProductInvItem product={this.props.batch.product}/>
        }

        {resourceList}

      </div>
    )
  }
}

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
