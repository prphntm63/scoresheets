const environment = process.env.NODE_ENV || 'development'
const config = require('./../knexfile.js')[environment];
const knex = require('knex')(config);

const competitionDbFunctions = {

}

module.exports = competitionDbFunctions