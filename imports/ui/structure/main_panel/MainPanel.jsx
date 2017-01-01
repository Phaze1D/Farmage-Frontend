import React from 'react';
import ReactDOM from 'react-dom'
import EventListener, {withOptions} from 'react-event-listener';
import classnames from 'classnames';


export default class MainPanel extends React.Component{

  constructor(props){
    super(props);
    this.bigHeaderHidden = false;

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event){
    let scrollTop = event.currentTarget.scrollTop;
    let title = document.getElementById(`${this.props.panelID}-ttbar`);
    let toolbar = title.closest('.toolbar');
    let f = 212 - toolbar.clientHeight;

    if(scrollTop < f ){

      if(this.bigHeaderHidden){
        toolbar.style.boxShadow = ``
      }
      let scale = - (scrollTop / f ) + 2;
      let y = 54 * (1 - scrollTop / f);
      let a = toolbar.clientWidth > 840 ? 40 : 15;
      let x = a * (1 - scrollTop / f);
      title.style.transform = `scale(${scale}) translate(${x}%, ${y}px)`

      this.bigHeaderHidden = false;
    }else{

      if(!this.bigHeaderHidden){
        title.style.transform = 'scale(1) translate(0,0)';
        toolbar.style.boxShadow = `
        0 3px 4px 0 rgba(0, 0, 0, .14),
        0 3px 3px -2px rgba(0, 0, 0, .2),
        0 1px 8px 0 rgba(0, 0, 0, .12)`
      }

      this.bigHeaderHidden = true

    }

  }

  render(){
    const mainClasses = classnames('main-panel', this.props.mainClasses)
    const panClasses = classnames('panel', this.props.classes)

    return(
      <div className={mainClasses}>
        <EventListener
          target={this.props.panelID}
          onScroll={withOptions(this.handleScroll, {passive: true, capture: false})}/>

        {React.cloneElement(this.props.toolbar, { titleID: `${this.props.panelID}-ttbar` })}

        <div id={this.props.panelID} className={panClasses}>
          <div className='big-header'></div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
