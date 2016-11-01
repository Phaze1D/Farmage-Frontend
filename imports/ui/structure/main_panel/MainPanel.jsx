import React from 'react';
import classnames from 'classnames';


export default class MainPanel extends React.Component{

  constructor(props){
    super(props);

  }


  render(){
    return(
      <div className='main-panel'>
        <div className='header'>

        </div>
        <div className={'panel '+this.props.classes}>
          {this.props.children}
        </div>
      </div>
    )

  }

}
