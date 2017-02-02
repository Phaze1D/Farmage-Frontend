import React from 'react';
import FlatButton from 'material-ui/FlatButton'
import classnames from 'classnames';
import {fade} from 'material-ui/utils/colorManipulator';
import Theme from '../app/Theme';



export default class MTabs extends React.Component{
  constructor(props){
    super(props)

    this.handleTabClick = this.handleTabClick.bind(this)
  }

  componentDidMount() {
    this.handleTabClick(null, 0)
  }

  componentDidUpdate(prevProps, prevState) {
    this.handleSwipe(this.props.value)
  }

  handleSwipe(value){
    let showMain = document.getElementById('show-main')
    let theight = window.innerWidth > 840 ? 68 : 58
    if(showMain.scrollTop > 276 - theight){
      showMain.scrollTop = 276 - theight + 1
    }

    let container = showMain.querySelector('.react-swipeable-view-container')
    let wcontent = showMain.querySelector('[aria-hidden=false]');
    if(wcontent.querySelector('.mtab-content')){
      container.style.height = wcontent.querySelector('.mtab-content').clientHeight + 'px'
    }else{
      setTimeout(() => {
        let showMain = document.getElementById('show-main')
        let container = showMain.querySelector('.react-swipeable-view-container')
        let wcontent = showMain.querySelector('[aria-hidden=false]');
        container.style.height = wcontent.querySelector('.mtab-content').clientHeight + 'px'
      }, 550)
    }

    let tabs = this.refs.mtabs.getElementsByClassName('mtab')
    let xtrans = 0;
    for (let i = 0; i < value; i++) {
      xtrans += (tabs[i].clientWidth / this.refs.mtabs.clientWidth)
    }
    this.refs.line.style.transform = `translateX(${xtrans * 100}%) scaleX(${tabs[value].clientWidth / this.refs.mtabs.clientWidth})`
  }

  handleTabClick(event, value){
    let tabs = this.refs.mtabs.getElementsByClassName('mtab')
    let xtrans = 0;
    for (let i = 0; i < value; i++) {
      xtrans += (tabs[i].clientWidth / this.refs.mtabs.clientWidth)
    }
    this.refs.line.style.transform = `translateX(${xtrans * 100}%) scaleX(${tabs[value].clientWidth / this.refs.mtabs.clientWidth})`
    this.props.onTabChange(event, value);
  }

  render(){
    const tabList = this.props.tabs.map((label, index) =>
      <MTab
        key={index}
        value={index}
        label={label}
        onTabClick={this.handleTabClick}
        isActive={index === this.props.value}/>
    )


    return(
      <div id='mtabs' className='mtabs' ref='mtabs'>
        <div className='mtabs-line' ref='line'></div>
        {tabList}
      </div>
    )
  }
}

class MTab extends React.Component{
  constructor(props){
    super(props)

    this.handleTouch = this.handleTouch.bind(this)
  }

  handleTouch(event){
    this.props.onTabClick(event, this.props.value)
  }

  render(){

    const labelColor = this.props.isActive ? Theme.palette.alternateTextColor : fade(Theme.palette.alternateTextColor, .54)

    return(
      <FlatButton
        id={`mtab-${this.props.value}`}
        value={this.props.value}
        className='mtab'
        label={this.props.label}
        hoverColor='transparent'
        rippleColor='white'
        labelStyle={{color: labelColor}}
        onTouchTap={this.handleTouch}/>
    )
  }
}
