import React from 'react'
import Portal from 'react-portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import IconButton from 'material-ui/IconButton';

import UnitSelectorList from '../../units/selector_items/UnitSelectorList';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import {randomImageColor} from '../../../structure/app/RandomColor.js';






export default class Details extends React.Component{
  constructor(props){
    super(props);

  }


  render() {


    return (
      <div>
        <div className='details-header'>
          <div className='title'>
            Items
          </div>

          <IconButton onTouchTap={this.toggleProductSelector}>
            <ContentAddCircle className='add'/>
          </IconButton>
        </div>



      </div>

    )
  }
}

class Item extends React.Component{
  constructor(props){
    super(props);

  }

  render(){

    return(
      <div>
        
      </div>
    )
  }
}

// <div className='row'>
//   <div className='col-xs-12'>
//     <SelectorButton title="Sector" highlight={this.props.expense.unit} toggleSelector={this.props.toggleUnitSelector}/>
//   </div>
// </div>
//
// {this.props.expense.unit &&
//   <UnitSelected unit={this.props.expense.unit}/>
// }
