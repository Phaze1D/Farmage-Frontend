import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factoryUnit} from '../faker/factoryUnit.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TreeIcon from '../../../structure/msvg/Barcode';
import UnitCard from '../card/UnitCard';


export default class UnitsIndex extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let units = [];

    for(let i = 0; i < 20; i++){
        units.push(factoryUnit());
    }

    units.sort((a, b) => {
      return a.name.localeCompare(b.name)
    });

    const listItems = units.map((unit) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={unit._id}>
        <UnitCard {...unit} />
      </div>
    );

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'enter-fab',
            leave: 'leave-fab',
            appear: 'appear-fab'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={0}
          transitionAppear={true}
          transitionAppearTimeout={100}>

            <FloatingActionButton key='unit-toggle' className="fab-unit-toggle">
              <TreeIcon className="icon"/>
            </FloatingActionButton>

        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'enter-index',
            leave: 'leave-index',
            appear: 'appear-index'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={100}>

          <div className='row is-flex'>
            {listItems}
          </div>

        </ReactCSSTransitionGroup>
      </div>

    );
  }
}
