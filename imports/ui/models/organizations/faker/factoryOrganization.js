import faker from 'faker'
import { Random } from 'meteor/random'
import {factoryOUser} from '../../ousers/faker/factoryOUser'



const testEmail = () => {
  if(Math.round(Math.random()) === 0){
    return faker.internet.email()
  }
  return ;
}

const testTelephones = () =>{
  var result = []
  for(i = 0; i < Math.round(Math.random()*6); i++){
    let telephone = {_id: faker.random.uuid()}
    if(Math.round(Math.random()) === 1) telephone.name = faker.random.word();
    telephone.number = faker.phone.phoneNumber()
    result.push(telephone)
  }
  return result;
}

const testAddresses = () => {
  var result = []
  for(i = 0; i < Math.round(Math.random()*5); i++){
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
  return result;
}

const testAvatar = () => {
  if(Math.round(Math.random()) === 0){
    return faker.image.avatar();
  }
  return ;
}

const factoryOrganization = () => {
  const organization = {
    _id: Random.id(),
    name: faker.company.companyName(),
    email: testEmail(),
    telephones: testTelephones(),
    addresses: testAddresses(),
    avatarURL: null,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    createdBy: factoryOUser(),
    updatedBy: factoryOUser()
  }

  return organization
}

exports.factoryOrganization = factoryOrganization;
