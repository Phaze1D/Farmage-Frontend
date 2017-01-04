import React from 'react';
import {factoryYield} from '../faker/factoryYield.js';
import YieldCard from '../card/YieldCard';
import YieldsNew from '../new/YieldsNew';
import YieldsFilter from '../filter/YieldsFilter';
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldsIndex extends React.Component{
  constructor(props){
    super(props);

    this.onCardUpdate = this.onCardUpdate.bind(this);
  }

  onCardUpdate(yield_id){
    this.refs.dashboard.toggleRight(yield_id, 'Update Yield');
  }


  render(){

    this.yields = [];
    for(let i = 0; i < 20; i++){
        this.yields.push(factoryYield());
    }
    this.yields.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

    const right = <YieldsNew/>;
    const filter = <YieldsFilter/>;

    const listItems = this.yields.map((_yield) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={_yield._id}>
        <YieldCard {..._yield} onRequestUpdate={this.onCardUpdate}/>
      </div>
    );

    return (
      <Dashboard
        defaultRightTitle='New Yield'
        headerTitle='Yields'
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
