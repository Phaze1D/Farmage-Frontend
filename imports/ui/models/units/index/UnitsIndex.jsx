import React from 'react';
import { Random } from 'meteor/random';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factoryUnit, factoryUnitsTree} from '../faker/factoryUnit.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TreeIcon from '../../../structure/msvg/TreeIcon';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import UnitCard from '../card/UnitCard';
import UnitsTreeIndex from './UnitsTreeIndex';
import classnames from 'classnames';


export default class UnitsIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {showGrid: true}
    this.testRootUnits = factoryUnitsTree(null, 0);
    this.toggleUFAB = this.toggleUFAB.bind(this);
  }

  toggleUFAB(event){
    this.setState({showGrid: !this.state.showGrid});
  }

  unitsArray(){
    let units = [];
    for(let i = 0; i < 20; i++){
        units.push(factoryUnit());
    }
    units.sort((a, b) => {
      return a.name.localeCompare(b.name)
    });

    return units.map((unit) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={unit._id}>
        <UnitCard {...unit} />
      </div>
    );
  }


  render(){


    const ufabClasses = classnames('fab-unit-toggle', {'flip-fab': this.state.showGrid})

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

            <FloatingActionButton key='unit-toggle' onTouchTap={this.toggleUFAB} className={ufabClasses}>
              {this.state.showGrid ? <TreeIcon className='icon'/> : <GridOn className="icon-g"/>}
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
          transitionAppearTimeout={400}>

          {this.state.showGrid ?
            <div key='units-grid' className='row is-flex'>
              {this.unitsArray()}
            </div>
            :
            <UnitsTreeIndex key='unit-tree' rootUnits={this.testRootUnits}/>
          }

        </ReactCSSTransitionGroup>
      </div>

    );
  }
}
