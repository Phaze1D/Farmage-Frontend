import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

let MFAB = (props) => (
  <ReactCSSTransitionGroup
    transitionName={ {
      enter: 'enter-fab',
      leave: 'leave-fab',
      appear: 'appear-fab'
    } }
    transitionEnterTimeout={400}
    transitionLeaveTimeout={400}
    transitionAppear={true}
    transitionAppearTimeout={400}>

      {props.show &&
        <FloatingActionButton id='index-fab' key='fab-main' secondary={true} onTouchTap={props.onClicked} className="fab">
          <ContentAdd className="icon"/>
        </FloatingActionButton>
      }
  </ReactCSSTransitionGroup>
);

export default MFAB;
