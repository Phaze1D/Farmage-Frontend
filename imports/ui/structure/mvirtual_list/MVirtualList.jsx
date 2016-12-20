import React from 'react';


export default class MVirtualList extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    return(
      <div id='mvirtual-list' className='mvirtual-list'>
        {this.props.children}
      </div>
    )
  }
}
