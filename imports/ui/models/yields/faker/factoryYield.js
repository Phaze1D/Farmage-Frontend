import faker from 'faker'
import { Random } from 'meteor/random'

import {factoryResource} from '../../resources/faker/factoryResource.js'
import {factoryUnit} from '../../units/faker/factoryUnit.js'


const testIdentifer = () => {
  if(faker.random.boolean()){
    // return faker.random.word();
  }
  return ;
}

const testCreated = () => {
  return faker.date.past();
}

const testExpires = () => {
  if(faker.random.boolean()){
    return faker.date.future();
  }
  return ;
}

const factoryYield = () => {
  let _yield = {
    _id: Random.id(),
    identifer: testIdentifer(),
    amount: (Math.random() * 400).toFixed(8),
    createdAt: testCreated(),
    expiresAt: testExpires(),
    resource: factoryResource(),
    unit: factoryUnit()
  }
  return _yield;
}

exports.factoryYield = factoryYield;
