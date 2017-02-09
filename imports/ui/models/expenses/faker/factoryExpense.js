import faker from 'faker'
import {Random} from 'meteor/random'
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
  return Number( (Math.random() * 30).toFixed(2) );
}

const testPrice = () => {
  return faker.commerce.price();
}

const testCreatedAt = () => {
  return faker.date.past(1);
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
  return Math.round(Math.random() * 50)
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
    totalPrice: testUnitPrice(),
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


const testItems = () => {

  let items = []
  let totalPrice = 0;
  let subTotal = 0;
  let extra = testUnitPrice();

  for (let i = 0; i < Math.round(Math.random() * 50); i++) {

    let quantity = 0
    let units = []
    for (var j = 0; j < Math.round(Math.random() * 5); j++) {
      let unit = {
        unit: factoryUnit(),
        unitID: Random.id(),
        quantity: testQuantity()
      }

      quantity += unit.quantity;
      units.push(unit)
    }

    quantity = quantity > 0 ? quantity: testQuantity()

    let item = {
      _id: Random.id(),
      name: testItemName(),
      unitPrice: testUnitPrice(),
      taxRate: testTaxRate(),
      quantity: quantity,
      units: units
    }

    subTotal += (item.unitPrice * item.quantity * (1 + item.taxRate/100))
    items.push(item)
  }

  totalPrice = extra + subTotal;

  return {items: items, totalPrice: totalPrice, extra: extra, subTotal: subTotal}
}

const factoryExpenseR = () => {
  let {
    items,
    totalPrice,
    subTotal,
    extra
  } = testItems()

  return {
    _id: faker.random.uuid(),
    subTotal: subTotal,
    totalPrice: totalPrice,
    extra: extra,
    items: items,
    customRef: faker.random.uuid(),
    notes: testNotes(),
    dateBought: testCreatedAt(),
    receiptUrl: testRecipt(),
    provider: testProvider(),
    createdAt: testCreatedAt(),
    updatedAt: testCreatedAt(),
    createdBy: factoryOUser(),
    updatedBy: factoryOUser()
  }
}

exports.factoryExpense = factoryExpense;
exports.factoryExpenseR = factoryExpenseR;
