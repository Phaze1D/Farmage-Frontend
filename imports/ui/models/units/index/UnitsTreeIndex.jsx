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
    }

    this.onClearSubs = this.onClearSubs.bind(this);
  }

  onCellSelected(unit, event){
    const ele = event.target.closest('.col-xs-12');
    this.setState({showSubs: true});
    setTimeout(()=>{this.setState({tranDone: true})}, 450)
    this.eleProp = {top: ele.offsetTop - 10, left: ele.offsetLeft, minHeight: ele.offsetHeight}
    this.selectedUnit = unit;
  }

  onClearSubs(event){
    this.selectedUnit = null;
    this.setState({showSubs: false, tranDone: false});
  }

  cells(units){

    if(this.selectedUnit){
      const traStyle = {
        transform: `translate(${this.eleProp.left * -1}px, ${this.eleProp.top * -1}px)`,
        minHeight: `${this.eleProp.minHeight}px`
      }

      if(this.state.tranDone){
        return(
          <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' style={{minHeight: `${this.eleProp.minHeight}px`}}>
            <UnitCard {...this.selectedUnit} showSubAction={true}/>
          </div>
        )

      }else{

        return units.map((unit) => {
          if(this.selectedUnit._id === unit._id){
            return(
              <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={unit._id} style={traStyle}>
                <UnitCard {...unit} showSubAction={true}/>
              </div>
            )
          }else{
            return(
              <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3 mhide' key={unit._id}>
                <UnitCard {...unit} showSubAction={true}/>
              </div>
            )
          }
        })

      }


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

        <div className='row is-flex divider'>
          {this.cells(this.props.unit.subUnits)}
        </div>


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

          {this.state.showSubs &&
            <TreeRow unit={this.selectedUnit} onClearSelf={this.onClearSubs} key='subUnits'/>
          }

        </ReactCSSTransitionGroup>

      </div>

    )
  }
}
