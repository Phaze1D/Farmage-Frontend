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

    this.yields = [];
    for(let i = 0; i < 20; i++){
        this.yields.push(factoryYield());
    }
    this.yields.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
  }


  render(){

    const right = <YieldsNew/>;
    const filter = <YieldsFilter/>;

    const listItems = this.yields.map((_yield) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={_yield._id}>
        <YieldCard {..._yield} />
      </div>
    );

    return (
      <Dashboard showMFAB={true} right={right} filter={filter} key='main-dash'>

        <MVirtualGrid>
          {listItems}
        </MVirtualGrid>

      </Dashboard>

    );
  }
}
