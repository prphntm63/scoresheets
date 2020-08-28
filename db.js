const userDbFunctions = require('./database/users')
const scoresheetDbFunctions = require('./database/scoresheets')
const competitionDbFunctions = require('./database/competitions')
const sessionsDbFunctions = require('./database/sessions')
const entriesDbFunctions = require('./database/sessions')

let db = {
    ...userDbFunctions,
    ...scoresheetDbFunctions,
    ...competitionDbFunctions,
    ...sessionsDbFunctions,
    ...entriesDbFunctions
}

module.exports = db;