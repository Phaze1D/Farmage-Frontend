import React from 'react';
import Portal from 'react-portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import EventListener, {withOptions} from 'react-event-listener';
import IconButton from 'material-ui/IconButton';
import BackArrow from 'material-ui/svg-icons/navigation/arrow-back';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ToolbarTitle from '../main_panel/ToolbarTitle';
import EditIcon from 'material-ui/svg-icons/image/edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MAvatar from '../mavatar/MAvatar';

export default class MShow extends React.Component{

  constructor(props){
    super(props);
    this.state = {showFAB: false}
    this.handleOverlayTouch = this.handleOverlayTouch.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.previousScroll = 0;
    this.fabLeft = false;
  }

  componentDidMount() {
    setTimeout(() => {this.setState({showFAB: true})}, 400)
  }

  handleOverlayTouch(event){
    event.stopPropagation();
    const classNames = event.target.className.toString();
    if(classNames && classNames.includes('show-card')){
      this.props.onRequestChange(event);
    }
  }

  handleScroll(event){
    let scrollTop = event.currentTarget.scrollTop
    let a = scrollTop/260
    this.refs.showBarTitle.style.color = `rgba(255,255,255, ${a})`

    if(scrollTop <= 260){
      let fab = document.getElementsByClassName('show-fab')[0]

      if(scrollTop > this.previousScroll && !this.fabLeft){
        console.log('leaving');
        fab.className = "fab show-fab leave-fab leave-fab-active";
        this.fabLeft = true;
      }else if(scrollTop < this.previousScroll && this.fabLeft){
        console.log('entering');
        fab.className = "fab show-fab enter-fab enter-fab-active";
        this.fabLeft = false;
      }

    }

    this.previousScroll = scrollTop
  }

  render(){
    return(
      <Portal isOpened={true}>

        <ReactCSSTransitionGroup component={FirstChild}
        transitionName={ {
          enter: 'enter-quick-fade',
          leave: 'leave-quick-fade',
          appear: 'appear-quick-fade'
        } }
        transitionEnterTimeout={450}
        transitionLeaveTimeout={450}
        transitionAppear={true}
        transitionAppearTimeout={450}>

          {this.props.open &&
            <div className='show-card' onTouchTap={this.handleOverlayTouch}>

              <EventListener
                target='show-main'
                onScroll={withOptions(this.handleScroll, {passive: true, capture: false})}/>

              <div className='show-toolbar toolbar'>
                <IconButton className='form-clear-b' onTouchTap={this.props.onRequestChange}>
                  <BackArrow/>
                </IconButton>
                <div className='show-bar-title' ref='showBarTitle'>
                  David Villarreal
                </div>
                <IconButton className='form-done-b'>
                  <MoreVert/>
                </IconButton>
              </div>

              <div className='show-header'>
                <MAvatar className='show-avatar'
                  style={{marginRight: '15px', padding: '1px 0 0 1px'}}
                  cha='G' src=''/>

                <div className='show-title'>
                  David Villarreal
                </div>

                <div className='show-sub'>
                  Company Name
                </div>
              </div>

              <div id='show-main' className='show-main'>

                <FAB show={this.state.showFAB}/>

                <div className='content'>
                  <div style={{height: '48px', backgroundColor: 'rgb(255,152,0)'}}>

                  </div>
                </div>
              </div>

            </div>
          }
        </ReactCSSTransitionGroup>

      </Portal>
    )
  }
}


let FAB = (props) => (
  <ReactCSSTransitionGroup
    component={FirstChild}
    transitionName={ {
      enter: 'enter-fab',
      leave: 'leave-fab',
      appear: 'appear-fab'
    } }
    transitionEnterTimeout={400}
    transitionLeaveTimeout={400}
    transitionAppear={true}
    transitionAppearTimeout={400}>

      {props.show &&
        <FloatingActionButton id='show-fab' secondary={true} onTouchTap={props.onClicked} className="fab show-fab">
          <EditIcon className="icon"/>
        </FloatingActionButton>
      }
  </ReactCSSTransitionGroup>
)

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}
