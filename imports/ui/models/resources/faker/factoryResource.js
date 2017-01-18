import faker from 'faker'
import {Random} from 'meteor/random'
import {factoryOUser} from '../../ousers/faker/factoryOUser'



const testName = () => {
  return faker.commerce.productMaterial();
}

const testMeasurementUnit = () => {
  return faker.lorem.word();
}

const testImageUrl = () => {
  if(Math.round(Math.random()) === 0){
    return faker.random.image();
  }
  return ;
}

const testDate = () => {
  if(Math.round(Math.random()) === 0){
    return faker.date.past();
  }
  return faker.date.past();
}

const testNotes = () => {
  if(Math.round(Math.random()) === 0){
    return faker.lorem.sentences();
  }
  return;
}

const factoryResource = () => {
  return {
    _id: Random.id(),
    name: testName(),
    stock: (Math.random() * 4000).toFixed(6),
    measurementUnit: testMeasurementUnit(),
    imageUrl: testImageUrl(),
    notes: testNotes(),
    createdAt: testDate(),
    updatedAt: testDate(),
    createdBy: factoryOUser(),
    updatedBy: factoryOUser()
  }
}

exports.factoryResource = factoryResource;
