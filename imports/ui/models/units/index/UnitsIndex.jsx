import React from 'react';
import { Random } from 'meteor/random';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factoryUnit, factoryUnitsTree} from '../faker/factoryUnit.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TreeIcon from '../../../structure/msvg/TreeIcon';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import UnitCard from '../card/UnitCard';
import UnitsNew from '../new/UnitsNew';
import UnitsFilter from '../filter/UnitsFilter';
import UnitsTreeIndex from './UnitsTreeIndex';
import classnames from 'classnames';
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';


export default class UnitsIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {showGrid: false}
    this.onCardUpdate = this.onCardUpdate.bind(this);
    this.testRootUnits = factoryUnitsTree(null, 0);
    this.toggleUFAB = this.toggleUFAB.bind(this);
  }

  onCardUpdate(unit_id){
    this.refs.dashboard.toggleRight(unit_id, 'Update Sector');
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
        <UnitCard {...unit} onRequestUpdate={this.onCardUpdate}/>
      </div>
    );
  }


  render(){

    const ufabClasses = classnames('fab-unit-toggle', {'flip-fab': this.state.showGrid})
    const right = <UnitsNew/>;
    const filter = <UnitsFilter/>;

    return (
      <Dashboard
        defaultRightTitle='New Sector'
        headerTitle='Sectors'
        showMFAB={true}
        right={right}
        filter={filter}
        ref='dashboard'
        key='main-dash'>

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



        {this.state.showGrid ?
          <MVirtualGrid >
            {this.unitsArray()}
          </MVirtualGrid>
          :
          <ReactCSSTransitionGroup
            transitionName={ {
              enter: 'enter-index',
              leave: 'leave-index',
              appear: 'appear-index'
            } }
            transitionEnterTimeout={400}
            transitionLeaveTimeout={4000}
            transitionAppear={true}
            transitionAppearTimeout={400}>
          <UnitsTreeIndex key='unit-tree' rootUnits={this.testRootUnits} onCardUpdate={this.onCardUpdate}/>
          </ReactCSSTransitionGroup>
        }


      </Dashboard>

    );
  }
}
