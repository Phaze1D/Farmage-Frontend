import faker from 'faker'
import { Random } from 'meteor/random'


const testName = () => {
  return faker.commerce.department();
}

const testTracking = () => {
  return faker.random.boolean();
}

const testActive = () => {
  return Math.round(Math.random() * 400);
}


const factoryUnit = () => {
  let unit = {
    _id: Random.id(),
    name: testName(),
    tracking: testTracking(),
    active: testActive(),
    parentUnit: {name: testName()}
  }
  return unit;
}

exports.factoryUnit = factoryUnit;
