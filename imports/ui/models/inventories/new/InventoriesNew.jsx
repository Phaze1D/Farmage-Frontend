import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';
import Toggle from 'material-ui/Toggle';
import classnames from 'classnames';

import SelectorButton from '../../../structure/selector_button/SelectorButton';
import MainPanel from '../../../structure/main_panel/MainPanel';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import TextArea from '../../../structure/textarea/TextArea';
import ProductInvItem from '../../products/selector_items/ProductInvItem';
import YieldInvItem from '../../yields/selector_items/YieldInvItem';
import randomImageColor from '../../../structure/app/RandomColor.js';






let DateTimeFormat = global.Intl.DateTimeFormat;

export default class InventoriesNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {minDate: new Date()}
    this.handleOnClose = this.handleOnClose.bind(this);
    this.productRandomColor = randomImageColor();
  }

  handleOnClose(event){
    this.props.onCloseRight(false);
  }

  render(){

    return(
      <MainPanel classes='container-fluid' header={
          <FormActionBar onClear={this.handleOnClose}/>
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
              floatingLabelText="Created At"
              fullWidth={true}
              onChange={ (event, date) => {this.setState({minDate: date}) } }
              defaultDate={new Date()}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'numeric',
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
                month: 'numeric',
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
            <SelectorButton title="Product" highlight={true}/>
          </div>
        </div>

        <ProductInvItem backgroundColor={this.productRandomColor}/>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Resource Yields" showImage={true} highlight={true}/>
          </div>
        </div>

        <YieldInvItem/>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Resource Yields" showImage={true} highlight={true}/>
          </div>
        </div>

        <YieldInvItem/>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Resource Yields" showImage={true} highlight={true}/>
          </div>
        </div>

        <YieldInvItem/>

      </MainPanel>
    )
  }
}
