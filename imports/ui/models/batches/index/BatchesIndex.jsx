import React from 'react';
import {factoryBatch} from '../faker/factoryBatch.js';
import BatchCard from '../card/BatchCard';
import BatchesNew from '../new/BatchesNew';
import BatchesFilter from '../filter/BatchesFilter';
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';


export default class BatchesIndex extends React.Component{
  constructor(props){
    super(props);
    this.onCardUpdate = this.onCardUpdate.bind(this);
  }

  onCardUpdate(batch_id){
    this.refs.dashboard.toggleRight(batch_id, 'Update Batch');
  }


  render(){
    let batches = [];

    for(let i = 0; i < 20; i++){
        batches.push(factoryBatch());
    }

    batches.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

    const listItems = batches.map((batch) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={batch._id}>
        <BatchCard {...batch} onRequestUpdate={this.onCardUpdate}/>
      </div>
    );

    const right = <BatchesNew/>;
    const filter = <BatchesFilter/>;

    return (
      <Dashboard
        defaultRightTitle='New Batch'
        headerTitle='Batches'
        showMFAB={true}
        right={right}
        filter={filter}
        ref='dashboard'
        key='main-dash'>

        <MVirtualGrid>
          {listItems}
        </MVirtualGrid>

      </Dashboard>

    );
  }
}
