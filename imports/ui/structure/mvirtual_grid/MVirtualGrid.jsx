import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



export default class MVirtualGrid extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return(
      <ReactCSSTransitionGroup
        component='div'
        className='row is-flex'
        transitionName={ {
          enter: 'enter-index',
          leave: 'leave-index',
          appear: 'appear-index'
        } }
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
        transitionAppear={true}
        transitionAppearTimeout={400}>

          {this.props.children}
      </ReactCSSTransitionGroup>
    )
  }
}
