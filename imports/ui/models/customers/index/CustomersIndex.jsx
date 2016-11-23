import React from 'react';
import PersonCard from '../../person/PersonCard'



export default class CustomersIndex extends React.Component{
  constructor(props){
    super(props);
  }



  render(){
    var numbers = [];

    for(var i = 1; i <= 200; i++){
        numbers.push(i);
    }
    const listItems = numbers.map((number) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={number.toString()}>
        <PersonCard/>
      </div>
    );


    return (
      <div className='row'>
        {listItems}
      </div>
    );
  }
}
