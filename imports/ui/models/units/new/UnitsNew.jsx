import React from 'react';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import classnames from 'classnames';

import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import SelectorButton from '../../../structure/selector_button/SelectorButton';
import LToggler from '../../../structure/ltoggler/LToggler';
import UnitSelectorItem from '../selector_item/UnitSelectorItem';



export default class UnitsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {tracking: true};
    this.handleTracking = this.handleTracking.bind(this);
  }


  handleTracking(event, isChecked){
    this.setState({tracking: isChecked})
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
          title="Tracking"
          subTitle="Track the changes in the unit's amount"
          defaultToggled={this.state.tracking}
          onToggle={this.handleTracking}/>

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
                defaultValue="0"
                hintText=""
                floatingLabelText="Amount"
                disabled={!this.state.tracking}
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Parent Unit" highlight={true}/>
          </div>
        </div>

      <UnitSelectorItem/>

      </MainPanel>
    )
  }
}
