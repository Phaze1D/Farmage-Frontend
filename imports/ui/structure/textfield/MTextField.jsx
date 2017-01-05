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
      prefixClass,
      mref,
      boxClass,
      ...textFieldProps
    } = this.props;

    const inputStyle = {};
    if(prefixSide === 'left'){
      inputStyle.paddingLeft = (prefix.length * 9.8) + 'px'
    }else{
      inputStyle.paddingRight = (prefix.length * 9.8) + 'px'
    }


    const tfClasses = classnames('m-textfield', prefixSide, textFieldProps.className ,{
      'm-transition': this.state.mTranstion || (this.props.value && this.props.value.length > 0 && prefixSide === 'left')
    })

    const preClasses = classnames(prefixSide, prefixClass);
    const boxClasses = classnames('m-text-box', boxClass);

    return(
      <div className={boxClasses}>
        <span className={preClasses}>{prefix}</span>
        <TextField {...textFieldProps} ref={mref} className={tfClasses} onFocus={this.handleFocus} onBlur={this.handleBlur} inputStyle={inputStyle}/>
      </div>
    )
  }
}
