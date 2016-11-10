import React from 'react';
import Toggle from 'material-ui/Toggle';
import classnames from 'classnames';


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
            onToggle={this.handleToggle}/>

        </div>
      </div>
    );
  }

}
