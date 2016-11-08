import React from 'react';
import TextField from 'material-ui/TextField';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';
import Toggle from 'material-ui/Toggle';
import classnames from 'classnames';



import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import AmountChanges from '../../amount_changes/AmountChanges';



const focusColor = {
  color: orangeA200,
  borderColor: orangeA200
};


export default class YieldsNew extends React.Component{
  constructor(props){
    super(props);
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
              defaultValue="Initial movement"
              floatingLabelText="Movement Note"
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
