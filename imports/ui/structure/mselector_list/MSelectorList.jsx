import React from 'react';


export default class MSelectorList extends React.Component{
  constructor(props){
    super(props);
  }


  render(){

    return(
      <div className='mselector-wrapper'>
        <div className='mselector-list'>
          {this.props.children}
        </div>

      </div>
    )
  }
}
