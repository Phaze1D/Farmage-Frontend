import faker from 'faker'
import { Random } from 'meteor/random'

import {factoryProduct} from '../../products/faker/factoryProduct.js'


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

const factoryInventory = () => {
  let inventory = {
    _id: Random.id(),
    identifer: testIdentifer(),
    amount: (Math.random() * 400).toFixed(0),
    createdAt: testCreated(),
    expiresAt: testExpires(),
    product: factoryProduct()
  }
  return inventory;
}

exports.factoryInventory = factoryInventory;
