const express = require('express');
const router = express.Router();
const db = require('./../db.js');

router.get('/test', ensureAuthenticated, (req, res) => {
    console.log('got Sessions test request')
    res.status(200).json({...req.user, endpoint: 'sessions'})
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({"error" : "Not Authenticated. Please log in again."})
    }
}

module.exports = router