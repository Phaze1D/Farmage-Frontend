import React from 'react';
import TextField from 'material-ui/TextField';
import {orangeA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';
import classnames from 'classnames';

import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import SelectorButton from '../../../structure/selector_button/SelectorButton';
import LToggler from '../../../structure/ltoggler/LToggler';



const focusColor = {
  color: orangeA200,
  borderColor: orangeA200
};

export default class UnitsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {height: '0px'};
    this.handleTracking = this.handleTracking.bind(this);
  }


  handleTracking(event, isChecked){
    const height = (this.colTrack.clientHeight+10) + "px";
    if(isChecked){
      this.setState({height: height});
      setTimeout(() => {this.setState({height: 'auto'})}, 400);
    }else{
      this.setState({height: height});
      setTimeout(() => {this.setState({height: '0px'});}, 200);
    }
  }

  render(){
    const style = {height: this.state.height}
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

        <LToggler
          title="Tracking"
          subTitle="Track the changes in the unit's amount"
          defaultToggled={false}
          onToggle={this.handleTracking}/>

        <div className="row row-flex track-row" style={style}>
          <div className='col-xs-8 sm-p-right' style={{marginBottom: '10px' }} ref={(div)=>{this.colTrack = div}}>
            <TextArea
              name="description"
              type="text"
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



        {/*<div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Parent Unit"/>
          </div>
        </div>*/}

      </MainPanel>
    )
  }
}
