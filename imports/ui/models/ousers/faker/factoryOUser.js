import faker from 'faker';


const testPermissions = () => {
  var founder = faker.random.boolean();
  var owner = (Math.random() * 100) < 30;
  return {
    founder: founder,
    owner: (owner),
    viewer: (faker.random.boolean() || owner),
    expensesManager: (faker.random.boolean() || owner),
    sellsManager: (faker.random.boolean() || owner),
    unitsManager: (faker.random.boolean() || owner),
    batchesManager: (faker.random.boolean() || owner),
    usersManager: (faker.random.boolean() || owner)
  }
}

const testEmail = () => {
  return faker.internet.email();
}

const testFirstName = () => {
  return faker.name.firstName();
}

const testLastName = () => {
  if(faker.random.boolean()){
    return faker.name.lastName();
  }
}

const testAvatar = () => {
  if(Math.round(Math.random()) === 0){
    return faker.image.avatar();
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

const testOUser = () => {
    return {
      _id: faker.random.uuid(),
      firstName: testFirstName(),
      lastName: testLastName(),
      email: testEmail(),
      avatarURL: testAvatar(),
      addresses: testAddresses(),
      telephones: testTelephones(),
      permissions: testPermissions(),
    }
}

const testDate = () => {
  if(Math.round(Math.random()) === 0){
    return faker.date.past();
  }
  return faker.date.past();
}

const factoryOUser = () => {
  return {
    _id: faker.random.uuid(),
    firstName: testFirstName(),
    lastName: testLastName(),
    email: testEmail(),
    avatarURL: testAvatar(),
    addresses: testAddresses(),
    telephones: testTelephones(),
    permissions: testPermissions(),
    invitedBy: testOUser(),
    createdAt: testDate()
  }
}

exports.factoryOUser = factoryOUser;
