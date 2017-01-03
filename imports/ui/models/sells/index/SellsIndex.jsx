import React from 'react';
import {factorySell} from '../faker/factorySell.js';
import SellCard from '../card/SellCard';
import SellsNew from '../new/SellsNew';
import SellsFilter from '../filter/SellsFilter';
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';


export default class SellsIndex extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let sells = [];

    for(let i = 0; i < 20; i++){
        sells.push(factorySell());
    }

    sells.sort((a, b) => {
      return  a.createdAt - b.createdAt;
    });

    const listItems = sells.map((sell) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={sell._id}>
        <SellCard {...sell} />
      </div>
    );

    const right = <SellsNew/>;
    const filter = <SellsFilter/>;

    return (
      <Dashboard
        headerTitle='Sales'
        showMFAB={true}
        right={right}
        filter={filter}
        key='main-dash'>

        <MVirtualGrid>
          {listItems}
        </MVirtualGrid>

      </Dashboard>

    );
  }
}
