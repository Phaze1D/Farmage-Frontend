import faker from 'faker'
import { factoryPerson } from '../../person/faker/factoryPerson.js'
import { factoryUnit } from '../../units/faker/factoryUnit.js'
import {factoryOUser} from '../../ousers/faker/factoryOUser'


const testItemName = () => {
  return faker.commerce.productName();
}

const testQuantity = () => {
  return Math.round(Math.random() * 10) + 1;
}

const testUnitPrice = () => {
  return (Math.random() * 30).toFixed(2);
}

const testPrice = () => {
  return faker.commerce.price();
}

const testCreatedAt = () => {
  return faker.date.past();
}

const testRecipt = () => {
  if(faker.random.boolean()){
    return faker.image.image();
  }
}

const testProvider = () => {
  if(faker.random.boolean()){
    return factoryPerson();
  }
  return ;
}

const testTaxRate = () => {
  return Math.round(Math.random() * 100)
}

const testNotes = () => {
  if(faker.random.boolean()){
    return faker.lorem.paragraph();
  }
}

const factoryExpense = () => {
  return {
    _id: faker.random.uuid(),
    itemName: testItemName(),
    quantity: testQuantity(),
    unitPrice: testUnitPrice(),
    taxRate: testTaxRate(),
    notes: testNotes(),
    dateBought: testCreatedAt(),
    receiptUrl: testRecipt(),
    provider: testProvider(),
    unit: factoryUnit(),
    createdAt: testCreatedAt(),
    updatedAt: testCreatedAt(),
    createdBy: factoryOUser(),
    updatedBy: factoryOUser()
  }
}

exports.factoryExpense = factoryExpense;
