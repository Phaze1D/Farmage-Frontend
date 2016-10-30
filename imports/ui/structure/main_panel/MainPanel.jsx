import React from 'react';


export default class MainPanel extends React.Component{

  constructor(props){
    super(props);

  }


  render(){
    return(
      <div className='main-panel'>
        <div className='header'>

        </div>
        <div className='panel'>
          {this.props.children}
        </div>
      </div>
    )

  }

}
