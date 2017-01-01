import React from 'react';
import ReactDOM from 'react-dom'
import EventListener, {withOptions} from 'react-event-listener';
import classnames from 'classnames';


export default class MainPanel extends React.Component{

  constructor(props){
    super(props);
    this.bigHeaderHidden = false;
    this.ticking = false;

    this.handleScroll = this.handleScroll.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.title = document.getElementById(`${this.props.panelID}-ttbar`);
    this.toolbar = this.title.closest('.toolbar');
  }

  handleScroll(event){
    let last_known_scroll_position = event.currentTarget.scrollTop;
    if (!this.ticking) {
        requestAnimationFrame(() => {
          this.update(last_known_scroll_position);
          this.ticking = false;
        });
      }
      this.ticking = true;
  }

  update(lastScrollY){
    let f = 212 - this.toolbar.clientHeight;

    if(lastScrollY < f ){

      if(this.bigHeaderHidden){
        this.toolbar.style.boxShadow = ``
      }
      let scale = - (lastScrollY / f ) + 2;
      let y = 54 * (1 - lastScrollY / f);
      let a = this.toolbar.clientWidth > 840 ? 40 : 15;
      let x = a * (1 - lastScrollY / f);
      this.title.style.transform = `scale(${scale}) translate(${x}%, ${y}px)`

      this.bigHeaderHidden = false;
    }else{

      if(!this.bigHeaderHidden){
        this.title.style.transform = 'scale(1) translate(0,0)';
        // this.toolbar.style.boxShadow = `
        // 0 3px 4px 0 rgba(0, 0, 0, .14),
        // 0 3px 3px -2px rgba(0, 0, 0, .2),
        // 0 1px 8px 0 rgba(0, 0, 0, .12)`
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
          onScroll={this.handleScroll}/>

        {React.cloneElement(this.props.toolbar, { titleID: `${this.props.panelID}-ttbar` })}

        <div id={this.props.panelID} className={panClasses}>
          <div className='big-header'></div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
