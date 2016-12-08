import React from 'react'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ActionClear from 'material-ui/svg-icons/content/clear';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';


import UnitCard from '../card/UnitCard';




export default class UnitsTreeIndex extends React.Component{
  constructor(props){
    super(props);

    this.rootUnit = {subUnits: this.props.rootUnits}
  }

  row(units){
    return units.map((unit) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={unit._id}>
        <UnitCard {...unit} showSubAction={true} onShowSubs={() => {}}/>
      </div>
    )
  }

  render(){

    // const listItems = this.props.unitsTree.map((unitT) =>
    //     <div className='row is-flex divider' key={unitT.parentID}>
    //       <Subheader className='unit-tree-header'>
    //         Parent Sub Units
    //         <IconButton>
    //           <ActionClear/>
    //         </IconButton>
    //       </Subheader>
    //       {this.row(unitT.units)}
    //     </div>
    //   )

    return(
      <TreeRow isRoot={true} unit={this.rootUnit}/>
    )
  }
}


class TreeRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubs: false,
      selectedLeft: 0,
      selectedTop: 0,
      reset: false
    }

    this.onClearSubs = this.onClearSubs.bind(this);
  }

  onCellSelected(unit, event){
    const ele = event.target.closest('.col-xs-12');
    this.setState({selectedLeft: ele.offsetLeft, selectedTop: ele.offsetTop - 10, showSubs: true, reset: true});
    setTimeout(() => {this.setState({reset: false})}, 10);
    this.selectedUnit = unit;
    this.minHeight = ele.offsetHeight + 45;
  }

  onClearSubs(event){
    this.setState({showSubs: false, reset: true});
    this.selectedUnit = null;
  }

  cells(units){
    if(this.selectedUnit){
      const traStyle = {left: `${this.state.selectedLeft}px`, top: `${this.state.selectedTop}px`}
      const traClasses = classnames('col-xs-12 col-sm-6 col-md-4 col-lg-3', {'with-duration': !this.state.reset})
      traStyle.position = 'absolute';

      return(
        <div className={traClasses} key={this.selectedUnit._id} style={traStyle}>
          <UnitCard {...this.selectedUnit} showSubAction={true} />
        </div>
      )

    }else{
      return units.map((unit) =>
        <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={unit._id}>
          <UnitCard {...unit} showSubAction={true} onShowSubs={this.onCellSelected.bind(this, unit)}/>
        </div>
      )
    }

  }

  render(){
    const title = this.props.isRoot ? 'Organization Root Units' : `${this.props.unit.name} Sub Units`;

    return(
      <div>
        <Subheader className='unit-tree-header'>
          {title}

          { !this.props.isRoot &&
            <IconButton onTouchTap={this.props.onClearSelf}>
              <ActionClear/>
            </IconButton>
          }

        </Subheader>

        <ReactCSSTransitionGroup component='div' className='row is-flex divider' style={{minHeight: `${this.minHeight}px`}}
          transitionName={ {
            enter: 'enter-index',
            leave: 'leave-index',
            appear: 'appear-index'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={100}>

          {this.cells(this.props.unit.subUnits)}

        </ReactCSSTransitionGroup>

        {this.state.showSubs &&
          <TreeRow unit={this.selectedUnit} onClearSelf={this.onClearSubs}/>
        }

      </div>

    )
  }
}
