import faker from 'faker'
import {Random} from 'meteor/random'


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

const factoryResource = () => {
  return {
    _id: Random.id(),
    name: testName(),
    stock: (Math.random() * 4000).toFixed(6),
    measurementUnit: testMeasurementUnit(),
    imageUrl: testImageUrl()
  }
}

exports.factoryResource = factoryResource;
