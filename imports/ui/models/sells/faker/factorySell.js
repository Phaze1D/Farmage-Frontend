import faker from 'faker'
import { factoryPerson } from '../../person/faker/factoryPerson';
import { factoryBatch } from '../../batches/faker/factoryBatch';
import { factoryProduct } from '../../products/faker/factoryProduct';
import { Random } from 'meteor/random'


const testReference = () => {
  return Random.id();
}

const testTotalPrice = () => {
  return (Math.random() * 100).toFixed(2);
}

const testCreatedAt = () => {
  return faker.date.past();
}

const testCustomer = () => {
  if(faker.random.boolean()){
    return factoryPerson();
  }
  return ;
}

const testStatus = () => {
  return faker.random.word();
}

const testDetails = () => {
  let details = []

  for(let i = 0; i < Math.round(Math.random() * 10); i++){
    const product = factoryProduct();
    let batches = [];
    let productQuantity = 0;

    for(let j = 0; j < Math.round(Math.random() * 5); j++){
      const batch = factoryBatch();
      const qt = Math.round(Math.random() * 50);
      productQuantity += qt;
      batches.push(
        {
          batch: batch,
          batchID: batch._id,
          quantityTaken: qt
        }
      )
    }

    productQuantity = productQuantity === 0 ? Math.round(Math.random() * 50) : productQuantity

    details.push(
      {
        product: product,
        productID: product._id,
        productName: product.name,
        quantity: productQuantity,
        unitPrice: product.unitPrice,
        taxRate: product.taxRate,
        batches: batches
      }
    )
  }

  return details
}


const factorySell = () => {
  let paid = faker.random.boolean();
  let paidAt = null;
  if(paid){
    paidAt = faker.date.past();
  }

  return {
    _id: faker.random.uuid(),
    reference: testReference(),
    totalPrice: testTotalPrice(),
    status: testStatus(),
    paid: paid,
    paidAt: paidAt,
    details: testDetails(),
    createdAt: testCreatedAt(),
    customer: testCustomer()
  }
}

exports.factorySell = factorySell;
