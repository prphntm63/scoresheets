const userDbFunctions = require('./database/users')
const scoresheetDbFunctions = require('./database/scoresheets')
const competitionDbFunctions = require('./database/competitions')
const flightsDbFunctions = require('./database/flights')
const entriesDbFunctions = require('./database/entries')

let db = {
    ...userDbFunctions,
    ...scoresheetDbFunctions,
    ...competitionDbFunctions,
    ...flightsDbFunctions,
    ...entriesDbFunctions
}

module.exports = db;