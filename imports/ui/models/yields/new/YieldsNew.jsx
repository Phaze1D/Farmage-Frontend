import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import classnames from 'classnames';


import SelectorButton from '../../../structure/selector_button/SelectorButton';
import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import FormActionBar from '../../../structure/form_action_bar/FormActionBar';
import UnitSelectorItem from '../../units/selector_item/UnitSelectorItem';
import ResourceYieldItem from '../../resources/selector_items/ResourceYieldItem';
import MTextField from '../../../structure/textfield/MTextField';
import randomImageColor from '../../../structure/app/RandomColor.js';




let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {minDate: new Date()}
    this.handleOnClose = this.handleOnClose.bind(this);
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

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Resource" highlight={true}/>
          </div>
        </div>

        <ResourceYieldItem backgroundColor={randomImageColor()}/>

        <div className="row">
          <div className='col-xs-8 sm-p-right'>
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
              disabled={false}
              rows={1} />
          </div>

          <div className='col-xs-4 sm-p-left'>
            <TextField
                name="amount"
                type="number"
                defaultValue="0"
                hintText=""
                floatingLabelText="Amount"
                fullWidth={true}
                disabled={false}/>
          </div>
        </div>


        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="From Unit" highlight={true}/>
          </div>
        </div>

        <UnitSelectorItem/>


      </MainPanel>
    )
  }
}
