import React from 'react';
import TextField from 'material-ui/TextField';
import classnames from 'classnames';




export default class MTextField extends React.Component{
  constructor(props){
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = {mTranstion: false};
  }

  handleFocus(event){
    if(this.props.prefixSide === 'left')
      this.setState({mTranstion: true});
  }

  handleBlur(event){
    if(event.target.value > 0 && this.props.prefixSide === 'left'){
      this.setState({mTranstion: true});
    }else{
      this.setState({mTranstion: false});
    }
  }


  render(){
    const {
      prefixSide,
      prefix,
      mref,
      ...textFieldProps
    } = this.props;

    const tfClasses = classnames('m-textfield', prefixSide, {
      'm-transition': this.state.mTranstion || (this.props.value && this.props.value.length > 0 && prefixSide === 'left')
    })

    return(
      <div className='m-text-box'>
        <span className={prefixSide}>{prefix}</span>
        <TextField {...textFieldProps} ref={mref} className={tfClasses} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
      </div>
    )
  }
}