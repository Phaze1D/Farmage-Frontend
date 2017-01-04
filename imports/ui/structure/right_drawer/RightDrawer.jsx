import React from 'react';
import Portal from 'react-portal'
import classnames from 'classnames';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';




export default class RightDrawer extends React.Component{

  constructor(props){
    super(props);
    this.onOverlayTap = this.onOverlayTap.bind(this);
  }

  onOverlayTap(){
    this.props.onRequestChange(false);
  }


  render(){
    return (
      <Portal isOpened={true}>
        <ReactCSSTransitionGroup component={FirstChild}
        transitionName={ {
          enter: 'enter-right',
          leave: 'leave-right',
          appear: 'appear-right'
        } }
        transitionEnterTimeout={550}
        transitionLeaveTimeout={550}
        transitionAppear={true}
        transitionAppearTimeout={550}>

          {this.props.open ?
            <div>
              <div className='overlay' onTouchTap={this.onOverlayTap}/>
              <AutoLockScrolling lock={this.props.open} />

              <div className='right-drawer'>
                {this.props.children}
              </div>
            </div>
            : null
          }


        </ReactCSSTransitionGroup>
      </Portal>
    )
  }
}

RightDrawer.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onRequestChange: React.PropTypes.func.isRequired
}

const FirstChild = (props) => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
