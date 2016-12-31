import React from 'react';
import ReactDOM from 'react-dom'
import EventListener, {withOptions} from 'react-event-listener';
import classnames from 'classnames';


export default class MainPanel extends React.Component{

  constructor(props){
    super(props);
    this.state = {large: false}
    this.handleWidth = this.handleWidth.bind(this)
    this.update = this.update.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.requestTick = this.requestTick.bind(this);
    this.latestKnownScrollY = 0,
  	this.ticking = false;
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

  update(){
    this.ticking = false;
    this.refs.header.style.transform = `translate3d(0px, -${this.latestKnownScrollY}px, 0px)`
    this.refs.header.children[0].style.transform = `translate3d(0px, ${this.latestKnownScrollY}px, 0px)`
  }


  onScroll(event) {
    let doc = event.target
  	this.latestKnownScrollY = (doc.scrollTop !== undefined) ? doc.scrollTop : window.scrollY;
    this.update()
  	// this.requestTick();
  }

  requestTick() {
  	if(!this.ticking) {
  		requestAnimationFrame(this.update);
  	}
  	this.ticking = true;
  }


  render(){
    const heaClasses = classnames('mheader-title', {'large': this.state.large})

    return(
      <div className={'main-panel ' + this.props.mainClasses}>
        <EventListener
          target={window}
          onResize={this.handleWidth}
        />

        <EventListener
          target={'panel' + this.props.targetScroll}
          onScroll={this.onScroll}
        />

      <div className='header' ref='header'>
          {this.props.header}
          <div className={heaClasses} ref='title'>
            {this.props.title}
          </div>
        </div>
        <div id={'panel' + this.props.targetScroll} className={'panel '+this.props.classes}>
          {this.props.children}
        </div>
      </div>
    )

  }

}
