import React from 'react';
import {orangeA200, orangeA100} from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';
import classnames from 'classnames';


const styles = {
  thumbSwitched: {
    backgroundColor: orangeA200,
  },
  trackSwitched: {
    backgroundColor: orangeA100,
  },
}

export default class LToggler extends React.Component{
  constructor(props){
    super(props);
    this.state = {toggled: this.props.defaultToggled}

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event, isChecked){
    this.setState({toggled: isChecked});

    if(this.props.onToggle)
      this.props.onToggle(event, isChecked);
  }

  render() {

    const totClasses = classnames('mtoggle-title', {'active': this.state.toggled});

    const {
      title,
      subTitle,
      onToggle,
      ...toggleProps
    } = this.props;

    return (
      <div className='row'>
        <div className='col-xs-12 col-flex' >

          <div className='mtoggle-info' onTouchTap={this.triggerToggle}>
            <div className={totClasses}>
              {title}
            </div>

            <div className='mtoggle-sub'>
              {subTitle}
            </div>
          </div>

          <Toggle
            {...toggleProps}
            className="mtoggle"
            thumbSwitchedStyle={styles.thumbSwitched}
            trackSwitchedStyle={styles.trackSwitched}
            onToggle={this.handleToggle}/>

        </div>
      </div>
    );
  }

}
