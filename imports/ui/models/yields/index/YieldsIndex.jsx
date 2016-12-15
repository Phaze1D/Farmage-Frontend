import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {factoryYield} from '../faker/factoryYield.js';
import YieldCard from '../card/YieldCard';
import YieldsNew from '../new/YieldsNew';
import MTable from '../../../structure/mtable/MTable';
import Dashboard from '../../../structure/dashboard/Dashboard';
import RightDrawer from '../../../structure/right_drawer/RightDrawer';
import MFAB from '../../../structure/dashboard/MFAB';


let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldsIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {ropen: false, fopen: false}

    this.toggleRight = this.toggleRight.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);



    this.yields = [];
    for(let i = 0; i < 20; i++){
        this.yields.push(factoryYield());
    }
    this.yields.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
  }

  toggleRight() {
    this.setState( (prevState, props) => ({ropen: !prevState.ropen}) );
  }

  toggleFilter() {
    this.setState( (prevState, props) => ({fopen: !prevState.fopen}) );
  }


  render(){

    const listItems = this.yields.map((_yield) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={_yield._id}>
        <YieldCard {..._yield} />
      </div>
    );

    return (
      <Dashboard>

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

          <div className='row is-flex'>
            {listItems}
          </div>
        </ReactCSSTransitionGroup>


        <MFAB show={true} onClicked={this.toggleRight}/>

        <RightDrawer open={this.state.ropen} onRequestChange={(open) => this.setState({ropen: open})}>
          <YieldsNew onCloseRight={this.toggleRight}/>
        </RightDrawer>

      </Dashboard>

    );
  }
}
