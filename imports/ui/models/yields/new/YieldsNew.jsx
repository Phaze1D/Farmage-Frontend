import React from 'react';
import TextField from 'material-ui/TextField';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';
import Toggle from 'material-ui/Toggle';
import classnames from 'classnames';



import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';



const focusColor = {
  color: orangeA200,
  borderColor: orangeA200
};

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {minDate: new Date()}

  }

  render(){

    return(
      <MainPanel classes='container-fluid'>
        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="name"
                type="text"
                className="input-lg"
                hintText=""
                floatingLabelText="Identifier"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-6 sm-p-right'>
            <DatePicker
              name="date_bought"
              floatingLabelText="Created At"
              floatingLabelFocusStyle={focusColor}
              underlineFocusStyle={focusColor}
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
              floatingLabelFocusStyle={focusColor}
              underlineFocusStyle={focusColor}
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
              floatingLabelFocusStyle={focusColor}
              underlineFocusStyle={focusColor}
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>
        </div>

        <div className="row">
          <div className='col-xs-8 sm-p-right' style={{marginBottom: '10px' }}>
            <TextArea
              name="movement_note"
              type="text"
              className=""
              defaultValue="Initial amount"
              floatingLabelText="Movement Notes"
              floatingLabelFocusStyle={focusColor}
              underlineFocusStyle={focusColor}
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>

          <div className='col-xs-4 sm-p-left' style={{marginBottom: '10px' }}>
            <TextField
                name="amount"
                type="number"
                defaultValue="0"
                hintText=""
                floatingLabelText="Amount"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
                fullWidth={true}/>
          </div>
        </div>


      </MainPanel>
    )
  }
}
