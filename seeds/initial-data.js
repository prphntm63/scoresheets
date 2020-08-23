
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.seed = function(knex) {
  console.log('Seeding 001-Users...')

  return knex('Users').insert( createUsers() )
  .catch(err => {console.log('users error - ', err)});;
};

function createUsers() {
  let users = [{
    "firstName" : "Test",
    "lastName" : "User",
    "email" : "test.user@gmail.com",
    "plaintextPassword" : "password" // For dev purposes only!
  }]
  
  users.forEach(function(user, index, users) {
    let hash = bcrypt.hashSync(user.plaintextPassword, saltRounds);
    users[index] = {
      ...user,
      "hashedPassword" : hash
    };
    delete users[index].plaintextPassword
  });

  return users
}