import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class MFade extends React.Component{
  constructor(props){
    super(props)
    this.state = {showChildren: false}
  }

  componentDidMount() {
    let time = this.props.time ? this.props.time : 550
    setTimeout(() => {this.setState({showChildren: true})}, time)
  }


  render(){

    return(
      <ReactCSSTransitionGroup component={FirstChild}
      transitionName={ {
        enter: 'enter-fade',
        leave: 'leave-fade',
        appear: 'appear-fade'
      } }
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      transitionAppear={true}
      transitionAppearTimeout={500}>
        {this.state.showChildren && this.props.children }
      </ReactCSSTransitionGroup>
    )
  }
}

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
