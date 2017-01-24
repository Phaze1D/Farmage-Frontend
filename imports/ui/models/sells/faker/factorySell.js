import faker from 'faker'
import { factoryPerson } from '../../person/faker/factoryPerson';
import { factoryBatch, factoryBatchNOR } from '../../batches/faker/factoryBatch';
import { factoryProduct, factoryProductNOR } from '../../products/faker/factoryProduct';
import { Random } from 'meteor/random';
import {factoryOUser} from '../../ousers/faker/factoryOUser'



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

  for(let i = 0; i < Math.round(Math.random() * 20); i++){
    const product = factoryProductNOR();
    let batches = [];
    let productQuantity = 0;

    for(let j = 0; j < Math.round(Math.random() * 10); j++){
      const batch = factoryBatchNOR();
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

const testDiscount = (type) => {
  if(type){
    return (Math.random() * 100).toFixed(0)
  }

  return (Math.random() * 50).toFixed(2)
}

const testDescription = () => {
  if(Math.round(Math.random()) === 0){
    return faker.lorem.sentences();
  }
  return ;
}

const testTelephone = () =>{
  var result = []
  for(i = 0; i < Math.round(Math.random()); i++){
    let telephone = {_id: faker.random.uuid()}
    if(Math.round(Math.random()) === 1) telephone.name = faker.random.word();
    telephone.number = faker.phone.phoneNumber()
    result.push(telephone)
  }
  return result[0];
}

const testAddress = () => {
  var result = []
  for(i = 0; i < Math.round(Math.random()); i++){
    let address = {_id: faker.random.uuid()}
    if(Math.round(Math.random()) === 1) address.name = faker.random.word();
    address.street1 = faker.address.streetAddress()
    if(Math.round(Math.random()) === 1) address.street2 = faker.address.secondaryAddress();
    if(Math.round(Math.random()) === 1) address.city = faker.address.city();
    if(Math.round(Math.random()) === 1) address.state = faker.address.state();
    if(Math.round(Math.random()) === 1) address.zip_code = faker.address.zipCode();
    if(Math.round(Math.random()) === 1) address.country = faker.address.country();

    result.push(address)
  }
  return result[0];
}

const factorySell = () => {
  let paid = faker.random.boolean();
  let paidAt = null;
  if(paid){
    paidAt = faker.date.past();
  }

  let details = testDetails();
  let total = 0;
  let subTotal = 0;
  let taxTotal = 0;
  let dt = faker.random.boolean()

  for (detail of details) {
    subTotal += (detail.unitPrice * detail.quantity)
    taxTotal += ((detail.unitPrice * detail.quantity) * (detail.taxRate/100))
  }

  total = subTotal + taxTotal;

  return {
    _id: faker.random.uuid(),
    reference: testReference(),
    totalPrice: Number(total.toFixed(2)),
    subTotal: Number(subTotal.toFixed(2)),
    taxTotal: Number(taxTotal.toFixed(2)),
    status: testStatus(),
    discountType: dt,
    discount: testDiscount(dt),
    paid: paid,
    paidAt: paidAt,
    details: testDetails(),
    notes: testDescription(),
    customer: testCustomer(),
    telephone: testTelephone(),
    billAddress: testAddress(),
    shipAddress: testAddress(),
    createdAt: testCreatedAt(),
    updatedAt: testCreatedAt(),
    createdBy: factoryOUser(),
    updatedBy: factoryOUser()
  }
}

exports.factorySell = factorySell;
