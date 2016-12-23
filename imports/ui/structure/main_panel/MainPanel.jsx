import React from 'react';
import ReactDOM from 'react-dom'
import EventListener, {withOptions} from 'react-event-listener';
import classnames from 'classnames';


export default class MainPanel extends React.Component{

  constructor(props){
    super(props);
    this.state = {large: false}
    this.handleWidth = this.handleWidth.bind(this)
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


  render(){
    console.log('adfasfa');
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
