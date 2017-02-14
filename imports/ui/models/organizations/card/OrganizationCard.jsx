import React from 'react';
import { browserHistory } from 'react-router'
import {CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import MCard from '../../../structure/mcard/MCard';
import {randomImageColor, alphaImageColor} from '../../../structure/app/RandomColor.js';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';
import OrganizationShow from './OrganizationShow';



export default class OrganizationCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {showCard: false, isOpened: false}
    this.cardOptions = this.cardOptions.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleOnShow = this.handleOnShow.bind(this)
  }

  handleUpdate(){
    this.props.onRequestUpdate(this.props._id)
  }

  handleOnShow(event){
    if(this.state.showCard){
      this.setState({showCard: false})
      setTimeout(() => {this.setState({isOpened: false})}, 500)
    }else{
      this.setState({showCard: true, isOpened: true})
    }
  }

  cardOptions(){
    return [
      <MenuItem key='edit' primaryText="Edit" leftIcon={<ImageEdit />} onTouchTap={this.handleUpdate}/>,
      <Divider key='divider'/>,
      <MenuItem key='delete' primaryText="Delete" leftIcon={<ActionDelete />} />,
    ]
  }


  render(){

    const {
      name,
      email,
      telephones,
      addresses,
      avatarURL,
      founder,
    } = this.props

    const title = name;
    let char = '';

    if(!avatarURL){
      char = title.toUpperCase().charAt(0);
    }

    const iStyle = {
      backgroundImage: "url('" + avatarURL + "')",
      backgroundColor: alphaImageColor(char)
    }

    return(
      <MCard className='card-row-flex' options={this.cardOptions()}>
        <div className='image-col' style={iStyle}>
          {char}
        </div>

        <div className='info-col'>
          <div className='card-top resource-top' style={{border: 'none'}} onTouchTap={this.handleOnShow}>
            <CardTitle className='card-title' title={title} subtitle=''/>
          </div>
          <div className='product-csection'>
            <div className='product-cinfo'>
              <span>Founder</span>
              {founder.firstName} {founder.lastName}
            </div>

          </div>

          

        </div>

        <AutoLockScrolling lock={this.state.showCard}/>

        {this.state.isOpened &&
          <OrganizationShow
            onFabClick={this.handleUpdate}
            personID={this.props._id}
            onRequestChange={this.handleOnShow}
            open={this.state.showCard}/>
        }
      </MCard>
    )
  }
}
