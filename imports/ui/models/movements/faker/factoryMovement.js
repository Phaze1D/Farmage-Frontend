import faker from 'faker'
import { Random } from 'meteor/random'
import { factoryOUser } from '../../ousers/faker/factoryOUser.js'

const testAmount = () => {
  return Math.round(Math.random() * (200) ) - 100;
}

const testForIdentifer = () => {
  if(faker.random.boolean()){
    return Random.id();
  }
  return faker.lorem.word();
}

const testForType = () => {
  const ar = ['unit', 'yield', 'batch'];
  return ar[Math.round(Math.random() * 2)];
}

const testCreatedAt = () => {
  return faker.date.past()
}

const factoryMovement = () => {
  return {
    _id: Random.id(),
    amount: testAmount(),
    forType: testForType(),
    forId: testForIdentifer(),
    createdAt: testCreatedAt(),
    manuel: faker.random.boolean(),
    user: factoryOUser()
  }
}

exports.factoryMovement = factoryMovement;
