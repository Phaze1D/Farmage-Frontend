import faker from 'faker'
import { Random } from 'meteor/random'

import {factoryProduct, factoryProductNOR} from '../../products/faker/factoryProduct.js'
import {factoryYield} from '../../yields/faker/factoryYield.js'
import {factoryOUser} from '../../ousers/faker/factoryOUser'


import Big from 'big.js'
Big.DP = 10




const testIdentifer = () => {
  if(faker.random.boolean()){
    return faker.random.word();
  }
  return ;
}

const testCreated = () => {
  return faker.date.past();
}

const testExpires = () => {
  if(faker.random.boolean()){
    return faker.date.future();
  }
  return ;
}

const testNotes = () => {
  if(faker.random.boolean()){
    return faker.lorem.paragraph();
  }
}

const testResourceYields = (product) => {
  let rYields = []
  for (pResource of product.resources) {
    let yields = []

    for(let i = 0; i < Math.round(Math.random() * 2); i ++){
      let y = factoryYield()
      yields.push({
        amountTaken: Big((Math.random() * 500).toFixed(8)).toString(),
        yieldID: y._id,
        yield: y
      })
    }

    rYields.push({
      resource: pResource.resource,
      amountPre: pResource.amountPre,
      resourceID: pResource.resource._id,
      yields: yields,
    })
  }

  return rYields
}

const factoryBatch = () => {
  let product = factoryProduct();
  let batch = {
    _id: Random.id(),
    identifer: testIdentifer(),
    amount: (Math.random() * 400).toFixed(0),
    notes: testNotes(),
    createdAt: testCreated(),
    expiresAt: testExpires(),
    product: product,
    rYields: testResourceYields(product),
    createdAt: testCreated(),
    updatedAt: testCreated(),
    createdBy: factoryOUser(),
    updatedBy: factoryOUser()

  }
  return batch;
}

const factoryBatchNOR = () => {
  let product = factoryProductNOR();
  let batch = {
    _id: Random.id(),
    identifer: testIdentifer(),
    amount: (Math.random() * 400).toFixed(0),
    notes: testNotes(),
    createdAt: testCreated(),
    expiresAt: testExpires(),
    product: product,
    createdAt: testCreated(),
    updatedAt: testCreated(),
    createdBy: factoryOUser(),
    updatedBy: factoryOUser()

  }
  return batch;
}

exports.factoryBatch = factoryBatch;
exports.factoryBatchNOR = factoryBatchNOR;
