import faker from 'faker'


const testEmail = () => {
  if(Math.round(Math.random()) === 0){
    return faker.internet.email()
  }
  return '';
}

const testCompanyName = () => {
  if(Math.round(Math.random()) === 0){
    return faker.company.companyName()
  }
  return '';
}

const testFirstName = () => {
  return faker.name.firstName()
}

const testLastName = () => {
  if(Math.round(Math.random()) === 0){
    return faker.name.lastName()
  }
  return '';
}

const testTelephones = () =>{
  var result = []
  for(i = 0; i < Math.round(Math.random()*6); i++){
    let telephone = {}
    if(Math.round(Math.random()) === 1) telephone.name = faker.random.word();
    telephone.number = faker.phone.phoneNumber()
    result.push(telephone)
  }
  return result;
}

const testAddresses = () => {
  var result = []
  for(i = 0; i < Math.round(Math.random()*5); i++){
    let address = {}
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
  return '';
}

const testNotes = () => {
  if(Math.round(Math.random()) === 0){
    return faker.lorem.sentences();
  }
  return ;
}

const factoryPerson = () => {
  const person = {
    _id: faker.random.uuid(),
    firstName: testFirstName(),
    lastName: testLastName(),
    email: testEmail(),
    company: testCompanyName(),
    telephones: testTelephones(),
    addresses: testAddresses(),
    notes: testNotes(),
    avatarURL: testAvatar()
  }

  return person;
}

exports.factoryPerson = factoryPerson ;
