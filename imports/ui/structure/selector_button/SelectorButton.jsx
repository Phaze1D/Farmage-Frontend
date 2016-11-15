import React from 'react';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import classnames from 'classnames';



export default class SelectorButton extends React.Component{
  constructor(props){
    super(props);
  }

  showError(message){
    if(message){
      return(
        <div className="error-div">
          <hr></hr>
          <div>
            This is and Error
          </div>
        </div>
      )
    }

    return null;
  }

  render(){
    sClasses = classnames('selector-button', {'highlight': this.props.highlight})
    tClasses = classnames('title', {'with-img': this.props.showImage})

    return(
      <div className={sClasses} onTouchTap={this.handleContactTouch}>
        {this.props.showImage &&
          <div className="selector-img" style={{backgroundImage: 'url(/default_item.jpg)'}}></div>
        }

        <div className={tClasses}>
          {this.props.title}
        </div>

        <IconButton onTouchTap={this.handleAddTouch}>
          <ImageEdit />
        </IconButton>

        {this.showError(null)}

      </div>
    );
  }
}
