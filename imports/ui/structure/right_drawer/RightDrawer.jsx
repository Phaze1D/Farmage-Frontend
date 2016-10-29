import React from 'react';
import classnames from 'classnames';



export default class RightDrawer extends React.Component{

  constructor(props){
    super(props);
  }


  render(){
    rightCls = classnames('right-drawer', { 'open': this.props.open});

    return (
      <div className={rightCls} open={this.props.open}>
        {this.props.children}
      </div>
    )
  }
}

RightDrawer.propTypes = {
  open: React.PropTypes.bool.isRequired
}
