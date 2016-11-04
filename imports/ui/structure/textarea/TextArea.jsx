import React from 'react';
import TextField from 'material-ui/TextField';
import classnames from 'classnames';




export default class TextArea extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: 0, focus: false, error: false, errorText: null};

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(event){
    const count = event.target.value.length;
    if(count > this.props.maxCount){
      this.setState({error: true});
      this.setState({errorText: 'Max'});
    }else if(this.state.error){
      this.setState({error: false});
      this.setState({errorText: null});
    }

    this.setState({count: count});
  }

  onFocus(event){
    this.setState({focus: true});
  }

  onBlur(event){
    this.setState({focus: false});
  }

  render(){
    let {
      showCount,
      maxCount,
      errorText,
      ...textFieldProps
    } = this.props;

    const boxClasses = classnames('count-box', {'focus':this.state.focus}, {'error': this.state.error});

    if(this.state.error){
      errorText = this.state.errorText;
    }

    return(
      <div className='count-root'>
        <TextField {...textFieldProps} errorText={errorText} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur}/>
          <div className={boxClasses}>
            {this.state.count}/{maxCount}
          </div>
      </div>

    )
  }
}
