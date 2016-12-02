import faker from 'faker'
import { Random } from 'meteor/random'


const testName = () => {
  return faker.commerce.department();
}

const testTracking = () => {
  return faker.random.boolean();
}

const testActive = () => {
  const rand = Math.round(Math.random() * 100);
  if( rand < 30){
    return 1;
  }else if(rand < 50 && rand > 30){
    return 0
  }
  return Math.round(Math.random() * 400);
}


const factoryUnit = () => {
  let mparentUnit = {}
  if(faker.random.boolean()){
    mparentUnit.name = testName();
  }

  let unit = {
    _id: Random.id(),
    name: testName(),
    active: testActive(),
    activeSub: testActive(),
    trackable: testTracking(),
    parentUnit: mparentUnit
  }
  return unit;
}

exports.factoryUnit = factoryUnit;
