import React from 'react';
import Portal from 'react-portal'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Overlay from 'material-ui/internal/Overlay';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import TextField from 'material-ui/TextField';




export default class MSearch extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Portal isOpened={true}>
        <div>
          <Overlay
            show={this.props.open}
            className='msearch-overlay'
            onTouchTap={this.props.onRequestChange}/>

          <ReactCSSTransitionGroup
          transitionName={ {
            enter: 'enter-search',
            leave: 'leave-search',
            appear: 'appear-search'
          } }
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={400}>
            {this.props.open &&
              <div className='msearch-bar'>
                <IconButton className='msearch-back' onTouchTap={this.props.onRequestChange} disableTouchRipple={true}>
                  <ArrowBack/>
                </IconButton>
                <TextField
                  type="search"
                  hintStyle={{fontSize: '20px'}}
                  className='msearch-input'
                  hintText='Search...'
                  underlineShow={false}/>

              </div>
            }
          </ReactCSSTransitionGroup>

        </div>
      </Portal>
    )
  }
}
