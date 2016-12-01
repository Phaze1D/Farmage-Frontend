import faker from 'faker'
import { Random } from 'meteor/random'


const testName = () => {
  return faker.commerce.productName();
}

const testSKU = () => {
  return Random.id(7);
}

const testImageUrl = () => {
  if(Math.round(Math.random()) === 0){
    // return faker.image.image();
  }
  return ;
}

const testUnitPrice = () => {
  return faker.commerce.price();
}

const testTaxRate = () => {
  return Math.round(Math.random() * 100)
}

const testStock = () => {
  return Math.round(Math.random() * 4000)
}

const factoryProduct = () => {
  return {
    _id: faker.random.uuid(),
    name: testName(),
    sku: testSKU(),
    unitPrice: testUnitPrice(),
    taxRate: testTaxRate(),
    stock: testStock(),
    imageUrl: testImageUrl()
  }
}

exports.factoryProduct = factoryProduct;
