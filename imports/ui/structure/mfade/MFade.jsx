import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class MFade extends React.Component{
  constructor(props){
    super(props)
    this.state = {showChildren: false}
  }

  componentDidMount() {
    setTimeout(() => {this.setState({showChildren: true})}, 550)
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
