import React from 'react';
import ReactDOM from 'react-dom'
import EventListener, {withOptions} from 'react-event-listener';
import classnames from 'classnames';

export default class ToolbarTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {large: false}

    this.handleWidth = this.handleWidth.bind(this);
  }

  componentDidMount() {
    this.handleWidth();
  }

  handleWidth(event){
    const toolBarRef = this.refs.title.closest('.toolbar')
    if(toolBarRef.clientWidth > 840 && !this.state.large){
      this.setState({large: true})
    }

    if(toolBarRef.clientWidth < 840 && this.state.large){
      this.setState({large: false})
    }
  }

  render(){
    const titClasses = classnames('mheader-title', {'large': this.state.large})

    return(
      <div id={this.props.titleID} className={titClasses} ref='title'>
        <EventListener
          target={window}
          onResize={this.handleWidth}/>

        {this.props.children}
      </div>
    )
  }
}
