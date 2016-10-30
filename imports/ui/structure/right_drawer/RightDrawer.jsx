import React from 'react';
import classnames from 'classnames';



export default class RightDrawer extends React.Component{

  constructor(props){
    super(props);
    this.onOverlayTap = this.onOverlayTap.bind(this);

  }

  onOverlayTap(){
    this.props.onRequestChange(false);
  }


  render(){
    rightCls = classnames('right-drawer', { 'open': this.props.open});
    overlayCls = classnames('overlay', {'open': this.props.open});

    return (
      <div>
        <div className={overlayCls} onTouchTap={this.onOverlayTap}/>

        <div className={rightCls}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

RightDrawer.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onRequestChange: React.PropTypes.func.isRequired
}
