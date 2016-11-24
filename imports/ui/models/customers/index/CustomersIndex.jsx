import React from 'react';
import PersonCard from '../../person/PersonCard'
import faker from 'faker'


function testCompanyName(){
  if(Math.round(Math.random()) === 0){
    return faker.company.companyName()
  }
  return '';
}


export default class CustomersIndex extends React.Component{
  constructor(props){
    super(props);
  }



  render(){
    var numbers = [];

    for(var i = 0; i < 25; i++){
        numbers.push(faker.name.firstName() + " " + faker.name.lastName());
    }

    numbers.sort()

    const listItems = numbers.map((number) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={number}>
        <PersonCard title={number} company={testCompanyName()}/>
      </div>
    );

    return (
      <div className='row is-flex'>
        {listItems}
      </div>
    );
  }
}
