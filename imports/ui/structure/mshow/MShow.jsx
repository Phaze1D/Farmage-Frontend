import React from 'react';
import Portal from 'react-portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class MShow extends React.Component{

  constructor(props){
    super(props);

  }

  componentDidMount() {

  }


  render(){

    return(
      <Portal isOpened={true}>

        <ReactCSSTransitionGroup component={FirstChild}
        transitionName={ {
          enter: 'enter-quick-fade',
          leave: 'leave-quick-fade',
          appear: 'appear-quick-fade'
        } }
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
        transitionAppear={true}
        transitionAppearTimeout={250}>

          {this.props.open &&
            <div className='show-card' style={this.props.openStyle}>

            

            </div>
          }
        </ReactCSSTransitionGroup>

      </Portal>
    )
  }
}

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
