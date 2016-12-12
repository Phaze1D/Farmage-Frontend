import React from 'react'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import NavBack from 'material-ui/svg-icons/navigation/arrow-back';
import ActionClear from 'material-ui/svg-icons/content/clear';
import TreeIcon from '../../../structure/msvg/TreeIcon';
import classnames from 'classnames';

import UnitCard from '../card/UnitCard';

import Scroll from 'react-scroll';




export default class UnitsTreeIndex extends React.Component{
  constructor(props){
    super(props);

    this.rootUnit = {subUnits: this.props.rootUnits}

  }

  render(){
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
      tranDone: false,
      veryBad: true
    }

    this.onClearSubs = this.onClearSubs.bind(this);
  }

  onCellSelected(unit, event){
    const ele = event.target.closest('.col-xs-12');
    const treOffset = event.target.closest('.tree').offsetTop
    this.setState({showSubs: false});
    Scroll.animateScroll.scrollTo(treOffset, {duration: 400, smooth: true});

    setTimeout(()=>{
      // Scroll.animateScroll.scrollTo(treOffset, {duration: 400, smooth: true});
      this.setState({tranDone: true, showSubs: true})
    }, 450)


    this.eleProp = {top: ele.offsetTop - 10, left: ele.offsetLeft, minHeight: ele.offsetHeight}
    this.selectedUnit = unit;
    this.selectedUnit.open = true;
  }

  onClearSubs(event){
    const test = event.target.closest('.row').offsetHeight - 20;
    Scroll.animateScroll.scrollTo(event.target.closest('.tree').offsetTop - test, {duration: 400, smooth: true});

    setTimeout(() => {this.setState({tranDone: false})}, 450)

    setTimeout(() => {
      this.selectedUnit.open = false;
      this.setState({veryBad: true});
    }, 400)

    this.setState({showSubs: false, veryBad: false});

  }

  cells(units){

    units.sort((x, y) => {
      return y.trackable - x.trackable;
    });

    if(this.selectedUnit && this.selectedUnit.open){
      const traStyle = {
        transform: `translate(${this.eleProp.left * -1}px, ${this.eleProp.top * -1}px)`,
        minHeight: `${this.eleProp.minHeight}px`
      }

      if(this.state.tranDone){
        return(
          <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' style={{minHeight: `${this.eleProp.minHeight}px`}}>
            <UnitCard {...this.selectedUnit}
              showSubAction={true}
              subActionButton={<ActionClear className='clear-action'/>}
              onShowSubs={this.onClearSubs}/>
          </div>
        )

      }else{
        return units.map((unit) => {
          if(this.selectedUnit._id === unit._id){
            return(
              <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={unit._id} style={traStyle}>
                <UnitCard {...unit}
                  showSubAction={true}
                  subActionButton={<ActionClear className='clear-action'/>}/>
              </div>
            )
          }else{
            return(
              <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3 mhide' key={unit._id}>
                <UnitCard {...unit}
                  showSubAction={true}
                  subActionButton={<TreeIcon/>}/>
              </div>
            )
          }
        })

      }


    }else{

      if(this.state.tranDone){
        const traStyle = {
          transform: `translate(${this.eleProp.left * -1}px, ${this.eleProp.top * -1}px)`,
          minHeight: `${this.eleProp.minHeight}px`
        }


        return units.map((unit) => {
          if(this.selectedUnit._id === unit._id){
            this.selectedUnit.open = false;
            return(
              <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={unit._id} style={traStyle}>
                <UnitCard {...unit}
                  showSubAction={true}
                  subActionButton={<TreeIcon/>}
                  onShowSubs={this.onCellSelected.bind(this, unit)}/>
              </div>
            )
          }else{
            return(
              <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3 mhide' key={unit._id}>
                <UnitCard {...unit}
                  showSubAction={true}
                  subActionButton={<TreeIcon/>}
                  onShowSubs={this.onCellSelected.bind(this, unit)}/>
              </div>
            )
          }
        })

      }else{
        return units.map((unit) =>
          <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={unit._id}>
            <UnitCard {...unit}
              showSubAction={true}
              subActionButton={<TreeIcon/>}
              onShowSubs={this.onCellSelected.bind(this, unit)}/>
          </div>
        )

      }

    }

  }

  render(){
    const title = this.props.isRoot ? 'Organization Root Units' : `${this.props.unit.name} Sub Units`;
    const treClass = classnames('tree', {'tree-row': this.props.isRoot})

    return(
      <div className={treClass}>
        <Subheader className='unit-tree-header'>
          {title}
        </Subheader>

        <div className='row is-flex divider'>
          {this.cells(this.props.unit.subUnits)}
        </div>


        <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'enter-tree',
            leave: 'leave-tree',
            appear: 'appear-tree'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={1000}
          transitionAppear={true}
          transitionAppearTimeout={400}>

          {this.state.showSubs &&
            <TreeRow unit={this.selectedUnit} key='subUnits'/>
          }

        </ReactCSSTransitionGroup>

      </div>

    )
  }
}
