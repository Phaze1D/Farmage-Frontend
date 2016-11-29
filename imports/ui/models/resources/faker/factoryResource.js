import faker from 'faker'


const testName = () => {
  return faker.commerce.productMaterial();
}

const testMeasurementUnit = () => {
  return faker.random.word();
}

const testImageUrl = () => {
  if(Math.round(Math.random()) === 0){
    // return faker.random.image();
  }
  return ;
}

const factoryResource = () => {
  return {
    _id: faker.random.uuid(),
    name: testName(),
    totalAmount: (Math.random() * 4000).toFixed(2),
    measurementUnit: testMeasurementUnit(),
    imageUrl: testImageUrl()
  }
}

exports.factoryResource = factoryResource;
