import React from 'react';
import { factoryMovement } from '../faker/factoryMovement.js';
import MovementCard from '../card/MovementCard';
import MovementsFilter from '../filter/MovementsFilter';
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';




export default class MovementsIndex extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let movements = [];

    for(let i = 0; i < 20; i++){
        movements.push(factoryMovement());
    }

    movements.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

    const listItems = movements.map((movement) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={movement._id}>
        <MovementCard {...movement} />
      </div>
    );

    const filter = <MovementsFilter/>;
    const right = <div></div>

    return (
      <Dashboard
        headerTitle='Movements'
        showMFAB={false}
        filter={filter}
        right={right}
        key='main-dash'>

        <MVirtualGrid>
          {listItems}
        </MVirtualGrid>

      </Dashboard>

    );
  }
}
