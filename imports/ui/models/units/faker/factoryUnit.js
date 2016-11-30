import faker from 'faker'
import { Random } from 'meteor/random'


const testName = () => {
  return faker.commerce.department()
}


const factoryUnit = () => {
  let unit = {
    _id: Random.id(),
    name: testName(),

  }
  return unit;
}

exports.factoryUnit = factoryUnit;
