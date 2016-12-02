import faker from 'faker'
import { factoryPerson } from '../../person/faker/factoryPerson.js'
import { Random } from 'meteor/random'


const testReference = () => {
  return Random.id();
}

const testTotalPrice = () => {
  return (Math.random() * 100).toFixed(2);
}

const testCreatedAt = () => {
  return faker.date.past();
}

const testCustomer = () => {
  if(faker.random.boolean()){
    return factoryPerson();
  }
  return ;
}

const testStatus = () => {
  return faker.random.word();
}


const factorySell = () => {
  let paid = faker.random.boolean();
  let paidAt = null;
  if(paid){
    paidAt = faker.date.past();
  }

  return {
    _id: faker.random.uuid(),
    reference: testReference(),
    totalPrice: testTotalPrice(),
    status: testStatus(),
    paid: paid,
    paidAt: paidAt,
    createdAt: testCreatedAt(),
    customer: testCustomer()
  }
}

exports.factorySell = factorySell;
