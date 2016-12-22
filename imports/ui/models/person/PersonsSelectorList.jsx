import React from 'react';
import {RadioButton} from 'material-ui/RadioButton';
import {PersonCheckBoxItem, PersonRadioItem} from './PersonItems';
import SelectorHeader, {handleRadioGroup} from '../../structure/mselector_list/SelectorHeader';
import MVirtualList from '../../structure/mvirtual_list/MVirtualList';
import {factoryPerson} from './faker/factoryPerson.js'



export default class PersonsSelectorList extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: 10, keyChecked: null};

    this.persons = []
    for (let i = 0; i < this.state.count; i++) {
      this.persons.push(factoryPerson())
    }
  }


  render(){

    const items = this.persons.map((person) => {
      return this.props.onlyOne ?
        <PersonRadioItem
          {...person}
          key={person._id}
          checked={person._id === this.state.keyChecked}
          onRadioClick={handleRadioGroup.bind(this)}/>
      :
        <PersonCheckBoxItem {...person} key={person._id}/>
    })

    const sortBy = ['First Name', 'Last Name', 'Company', 'Email'];

    return(
        <div className='mselector-wrapper'>
          <div className='mselector-list'>

            <SelectorHeader
              vID='person-list'
              title={this.props.title}
              sortBy={sortBy}
              backTouched={this.props.onRequestChange}/>

            <MVirtualList id='person-list'>
              {items}
            </MVirtualList>

          </div>
        </div>
    )
  }
}
