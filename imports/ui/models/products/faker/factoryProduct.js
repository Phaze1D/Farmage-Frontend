import faker from 'faker'
import { Random } from 'meteor/random'
import { factoryResource } from '../../resources/faker/factoryResource';
import {factoryOUser} from '../../ousers/faker/factoryOUser'



const testName = () => {
  return faker.commerce.productName();
}

const testSKU = () => {
  return Random.id(7);
}

const testImageUrl = () => {
  if(Math.round(Math.random()) === 0){
    return faker.image.image();
  }
  return ;
}

const testUnitPrice = () => {
  return (Math.random() * 400).toFixed(2);
}

const testTaxRate = () => {
  return Math.round(Math.random() * 20)
}

const testStock = () => {
  return Math.round(Math.random() * 4000)
}

const testDescription = () => {
  if(Math.round(Math.random()) === 0){
    return faker.lorem.sentences();
  }
  return ;
}

const testSize = () => {
  if(Math.round(Math.random()) === 0){
    return faker.commerce.color();
  }
  return ;
}

const testResources = () => {
  let count = Math.round(Math.random() * 10) + 1
  let array = []
  for (var i = 0; i < count; i++) {
    let re = factoryResource()
    array.push({
      resourceID: re._id,
      resource: re,
      name: re.name,
      measurementUnit: re.measurementUnit,
      amountPre: (Math.random() * 400).toFixed(8)
    })
  }

  return array
}

const testDate = () => {
  if(Math.round(Math.random()) === 0){
    return faker.date.past();
  }
  return faker.date.past();
}

const factoryProduct = () => {
  return {
    _id: faker.random.uuid(),
    name: testName(),
    sku: testSKU(),
    size: testSize(),
    unitPrice: parseFloat(testUnitPrice()),
    taxRate: parseFloat(testTaxRate()),
    stock: testStock(),
    description: testDescription(),
    imageUrl: testImageUrl(),
    createdAt: testDate(),
    updatedAt: testDate(),
    createdBy: factoryOUser(),
    updatedBy: factoryOUser(),
    resources: testResources()
  }
}

exports.factoryProduct = factoryProduct;
