const express = require('express');
const router = express.Router();
const db = require('./../db.js');

router.get('/test', ensureAuthenticated, (req, res) => {
    console.log('got scoresheet API test request')
    res.status(200).json({...req.user, endpoint: 'scoresheets'})
})

router.post('/get', ensureAuthenticated, (req,res) => {})

router.post('/update', ensureAuthenticated, (req,res) => {})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({"error" : "Not Authenticated. Please log in again."})
    }
}

module.exports = router