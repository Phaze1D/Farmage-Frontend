import React from 'react';
import Portal from 'react-portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import IconButton from 'material-ui/IconButton';
import ImageCameraAlt from 'material-ui/svg-icons/image/camera-alt';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ProductSellItem from '../../products/selector_items/ProductSellItem';
import ProductsSelectorList from '../../products/selector_items/ProductsSelectorList';
import InventoriesSelectorList from '../../inventories/selector_items/InventoriesSelectorList';
import {randomImageColor} from '../../../structure/app/RandomColor.js';






export default class Details extends React.Component{
  constructor(props){
    super(props);
    this.state = {psopen: false, isopen: false}

    this.toggleProductSelector = this.toggleProductSelector.bind(this);
    this.toggleInventorySelector = this.toggleInventorySelector.bind(this);
  }

  toggleInventorySelector(event){
    this.setState({isopen: !this.state.isopen, psopen: false});
  }

  toggleProductSelector(event){
    this.setState({psopen: !this.state.psopen, isopen: false});
  }

  closeSelectorLists(){
    this.setState({psopen: false, isopen: false});
  }


  render() {
    return (
      <div>
        <div className='details-header'>
          <div className='title'>
            Products
          </div>

          <IconButton onTouchTap={this.handleAddTouch}>
            <ImageCameraAlt className='camera-alt'/>
          </IconButton>

          <IconButton onTouchTap={this.toggleProductSelector}>
            <ImageEdit className='edit'/>
          </IconButton>
        </div>


        <ProductSellItem
          backgroundColor={randomImageColor()}
          toggleInventorySelector={this.toggleInventorySelector}/>
        <ProductSellItem
          backgroundColor={randomImageColor()}
          toggleInventorySelector={this.toggleInventorySelector}/>
        <ProductSellItem
          backgroundColor={randomImageColor()}
          toggleInventorySelector={this.toggleInventorySelector}/>
        <ProductSellItem
          backgroundColor={randomImageColor()}
          toggleInventorySelector={this.toggleInventorySelector}/>
        <ProductSellItem
          backgroundColor={randomImageColor()}
          toggleInventorySelector={this.toggleInventorySelector}/>
        <ProductSellItem
          backgroundColor={randomImageColor()}
          toggleInventorySelector={this.toggleInventorySelector}/>


        <Portal isOpened={true}>
          <ReactCSSTransitionGroup component={FirstChild}
          transitionName={ {
            enter: 'enter-selector-list',
            leave: 'leave-selector-list',
            appear: 'appear-selector-list'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={400}>

          {this.state.psopen &&
            <ProductsSelectorList key='ys' onRequestChange={this.toggleProductSelector} onlyOne={false}/>
          }

          </ReactCSSTransitionGroup>
        </Portal>

        <Portal isOpened={true}>
          <ReactCSSTransitionGroup component={FirstChild}
          transitionName={ {
            enter: 'enter-selector-list',
            leave: 'leave-selector-list',
            appear: 'appear-selector-list'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={400}>

          {this.state.isopen &&
            <InventoriesSelectorList key='ys' onRequestChange={this.toggleInventorySelector} title='Product Inventories' onlyOne={false}/>
          }

          </ReactCSSTransitionGroup>
        </Portal>


      </div>

    )
  }
}


function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
