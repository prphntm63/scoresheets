const environment = process.env.NODE_ENV || 'development'
const config = require('./../knexfile.js')[environment];
const knex = require('knex')(config);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userDbFunctions = {
    createUser : function(userParams) {

        return bcrypt.hash(userParams.plaintextPassword, saltRounds)
        .then(hashedPassword => {
            delete userParams.plaintextPassword
            userParams.hashedPassword = hashedPassword

            return knex
            .returning('*')
            .insert(userParams)
            .into('Users')
            .then(users => {
                return users.length ? users[0] : null
            })
        })

        
    },

    updateUser : function(userParams) {
        if (userParams.plaintextPassword) {
            return bcrypt.hash(userParams.plaintextPassword, saltRounds)
            .then(hashedPassword => {
                delete userParams.plaintextPassword
                userParams.hashedPassword = hashedPassword

                return knex('Users')
                .returning('*')
                .where({email : userParams.email})
                .update(userParams)
                .then(users => {
                    return users.length ? users[0] : null
                })
            })
        } else {
            return knex('Users')
            .returning('*')
            .where({email : userParams.email})
            .update(userParams)
            .then(users => {
                return users.length ? users[0] : null
            })
        }

        
    },

    getUser : function(userId) {
        return knex('Users')
        .select('*')
        .where({id : userId})
        .then(userRows => {
            return userRows[0]
        })
    },

    authenticateUser : function(username, password) {
        return knex('Users')
        .select('*')
        .where({email : username})
        .then(userRows => {
            return userRows[0]
        })
        .then(user => {
            let passwordPromise = new Promise((resolve, reject) => {
                bcrypt.compare(password, user.hashedPassword, function(err, res) {
                    if (err) reject(err)

                    let userInfo = false

                    if (res) {
                        userInfo = {...user}
                        delete userInfo.hashedPassword
                    }

                    resolve(userInfo)
                });
            })

            return passwordPromise
        })
    }
}

module.exports = userDbFunctions