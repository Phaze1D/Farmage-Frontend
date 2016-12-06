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
    inventoriesManager: (faker.random.boolean() || owner),
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

const factoryOUser = () => {
  return {
    _id: faker.random.uuid(),
    firstName: testFirstName(),
    lastName: testLastName(),
    email: testEmail(),
    avatarURL: testAvatar(),
    permissions: testPermissions()
  }
}

exports.factoryOUser = factoryOUser;
