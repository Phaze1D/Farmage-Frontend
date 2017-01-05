import React from 'react';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import classnames from 'classnames';
import MAvatar from '../mavatar/MAvatar';


export default class SelectorButton extends React.Component{
  constructor(props){
    super(props);
    this.handleTitleTouch = this.handleTitleTouch.bind(this);
    this.handleIconTouch = this.handleIconTouch.bind(this);
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

  handleTitleTouch(event){
    event.stopPropagation();
    if(!this.props.highlight){
      this.props.toggleSelector(event);
    }

  }

  handleIconTouch(event){
    event.stopPropagation();
    this.props.toggleSelector(event);
  }



  render(){
    const sClasses = classnames('selector-button', {'highlight': this.props.highlight, 'with-img': this.props.showImage})
    const tClasses = classnames('title', {'with-img': this.props.showImage})
    const char = this.props.title.toUpperCase().charAt(0);

    return(
      <div className={sClasses} onTouchTap={this.handleTitleTouch}>
        {this.props.showImage &&
          <MAvatar className='card-avatar'
            style={{marginRight: '15px', padding: '1px 0 0 0px', fontSize: '16px'}}
            size={35} cha={char} src={this.props.imageUrl}/>
        }

        <div className={tClasses}>
          {this.props.title}
          <div className='sub-title'>
            {this.props.subTitle}
          </div>
        </div>

        <div className='sec-title'>
          {this.props.secTitle}
        </div>

        <IconButton onTouchTap={this.handleIconTouch}>
          <ImageEdit />
        </IconButton>

        {this.showError(null)}

      </div>
    );
  }
}
