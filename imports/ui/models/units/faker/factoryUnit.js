import faker from 'faker'
import { Random } from 'meteor/random'
import {factoryOUser} from '../../ousers/faker/factoryOUser'



const testName = () => {
  return faker.commerce.department();
}

const testTracking = () => {
  return faker.random.boolean();
}

const testActive = () => {
  return Math.round(Math.random() * 400);
}

const testDescription = () => {
  if(faker.random.boolean()){
    return faker.lorem.paragraph();
  }
}

const testDate = () => {
  if(Math.round(Math.random()) === 0){
    return faker.date.past();
  }
  return faker.date.past();
}


const factoryUnit = () => {
  let mparentUnit = null
  if(faker.random.boolean()){
    mparentUnit = {
      _id: Random.id(),
      name: testName(),
      active: testActive(),
      activeSub: testActive(),
      trackable: true,
      description: testDescription()
    }
  }

  let unit = {
    _id: Random.id(),
    name: testName(),
    active: testActive(),
    activeSub: testActive(),
    trackable: testTracking(),
    description: testDescription(),
    parentUnit: mparentUnit,
    createdAt: testDate(),
    updatedAt: testDate(),
    createdBy: factoryOUser(),
    updatedBy: factoryOUser()
  }
  return unit;
}


const factoryUnitsTree = (parentU, count) => {
  let subUnits = [];
  if(count < 5){
    count = count + 1;
    let subC = Math.round(Math.random() * 10);

    for(let i = 0; i < subC; i++){
      let unit = {
        _id: Random.id(),
        name: testName(),
        active: testActive(),
        activeSub: testActive(),
        trackable: testTracking(),
        hasYields: faker.random.boolean(),
        parentUnit: parentU,
        createdAt: testDate(),
        updatedAt: testDate(),
        createdBy: factoryOUser(),
        updatedBy: factoryOUser()
      }

      if(!unit.trackable){
        unit.subUnits = factoryUnitsTree(unit, count)
      }

      subUnits.push(unit);

    }

  }

  return subUnits;
}


exports.factoryUnitsTree = factoryUnitsTree;
exports.factoryUnit = factoryUnit;
