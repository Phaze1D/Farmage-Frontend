import React from 'react';
import classnames from 'classnames';



export default class RightDrawer extends React.Component{

  constructor(props){
    super(props);

  }


  render(){
    rightCls = classnames('right-drawer', { 'open': this.props.open});
    overlayCls = classnames('overlay', {'open': this.props.open});

    return (
      <div>
        <div className={overlayCls} onTouchTap={this.props.onOverlayTap}></div>

        <div className={rightCls}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

RightDrawer.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onOverlayTap: React.PropTypes.func.isRequired
}
