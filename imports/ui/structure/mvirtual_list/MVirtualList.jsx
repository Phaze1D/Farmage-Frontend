import React from 'react';


export default class MVirtualList extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    return(
      <div id={this.props.id} className='mvirtual-list'>
        {this.props.children}
      </div>
    )
  }
}
