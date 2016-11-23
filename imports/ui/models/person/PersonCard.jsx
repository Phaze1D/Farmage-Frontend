import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import faker from 'faker'




export default class PersonCard extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    const title = faker.name.firstName() + " " +faker.name.lastName()
    const company = faker.company.companyName()
    return(
      <Card className='mcard'>
        <CardTitle title={title} subtitle={company}/>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="SELLS" />
        </CardActions>

      </Card>
    )
  }
}
