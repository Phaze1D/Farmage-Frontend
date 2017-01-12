import React from 'react';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';

import {factoryBatch} from '../faker/factoryBatch';


export default class BatchShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this)

    this.batch = factoryBatch();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
  }

  render(){
    const title = this.batch.identifer ? this.batch.identifer : this.batch._id

    return(
      <MShow
        onFabClick={this.props.onFabClick}
        title={title}
        subTitle='Batch Identifer'
        hasFAB={true}
        hasAvatar={false}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary', 'Reports', 'Analyzes']}/>

      </MShow>
    )
  }
}
