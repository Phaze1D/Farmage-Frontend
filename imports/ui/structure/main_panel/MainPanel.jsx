import React from 'react';
import ReactDOM from 'react-dom'
import EventListener, {withOptions} from 'react-event-listener';
import classnames from 'classnames';


export default class MainPanel extends React.Component{

  constructor(props){
    super(props);
    this.state = {large: false}
    this.handleWidth = this.handleWidth.bind(this)
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.handleWidth();
  }

  handleWidth(event){
    if(ReactDOM.findDOMNode(this.refs.header).clientWidth > 700 && !this.state.large){
      this.setState({large: true})
    }

    if(ReactDOM.findDOMNode(this.refs.header).clientWidth < 700 && this.state.large){
      this.setState({large: false})
    }
  }

  handleScroll(event){
    let doc = event.target;
    let top = (doc.scrollTop !== undefined) ? doc.scrollTop : window.pageYOffset;

    // this.refs.header.children[0].style.transform = `translate3d(0px, ${top}px, 0px)`
  }


  render(){
    const heaClasses = classnames('mheader-title', {'large': this.state.large})

    return(
      <div className={'main-panel ' + this.props.mainClasses}>
        <EventListener
          target={window}
          onResize={this.handleWidth}
        />

      <div className='header' ref='header'>
          {this.props.header}
          <div className={heaClasses}>
            {this.props.title}
          </div>
        </div>
        <div className={'panel '+this.props.classes}>
          {this.props.children}
        </div>
      </div>
    )

  }

}
