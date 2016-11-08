import React from 'react';
import TextField from 'material-ui/TextField';
import {orangeA200, orangeA100} from 'material-ui/styles/colors';
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

const styles = {
  thumbSwitched: {
    backgroundColor: orangeA200,
  },
  trackSwitched: {
    backgroundColor: orangeA100,
  },
}


export default class UnitsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {tracking: true};
    this.handleTracking = this.handleTracking.bind(this);
  }


  handleTracking(event, isChecked){
    this.setState({tracking: isChecked});
  }

  render(){
    const trClasses = classnames('row row-flex track-row', {'show-track': this.state.tracking});
    const totClasses = classnames('mtoggle-title', {'active': this.state.tracking});

    return(
      <MainPanel classes='container-fluid'>
        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="name"
                type="text"
                className="input-lg"
                hintText=""
                floatingLabelText="Unit Name"
                floatingLabelFocusStyle={focusColor}
                underlineFocusStyle={focusColor}
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
              floatingLabelFocusStyle={focusColor}
              underlineFocusStyle={focusColor}
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>
        </div>

        <div className={trClasses}>
          <div className='col-xs-8 sm-p-right' style={{marginBottom: '10px' }}>
            <TextArea
              name="description"
              type="text"
              className=""
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

        <div className='row'>
          <div className='col-xs-12 col-flex'>

            <div className='mtoggle-info'>
              <div className={totClasses}>
                Tracking
              </div>

              <div className='mtoggle-sub'>
                Track the changes in the unit's amount
              </div>
            </div>

            <Toggle
              defaultToggled={true}
              className="mtoggle"
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              onToggle={this.handleTracking}/>

          </div>
        </div>



      </MainPanel>
    )
  }
}
