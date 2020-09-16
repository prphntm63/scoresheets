const express = require('express');
const router = express.Router();
const fetch = requrire('node-fetch')
const db = require('./../db.js');
const userDbFunctions = require('../database/users.js');

const purgeValues = ['hashedPassword', 'ctime', 'mtime', 'id', 'role', 'verified','invite_code','subscription_id']

router.get('/test', ensureAuthenticated, (req, res) => {
    console.log('got Users test request')
    res.status(200).json({...req.user, endpoint: 'users'})
})

router.post('/get', ensureAuthenticated, (req,res) => {
    const superUser = req.user.role === "MODERATOR" || req.user.role === "SUPERADMIN"
    const email = req.body.email

    db.getUser(email)
    .then(userData => {
        if (!userData) {
            res.status(404)
        }

        // Check for user subscription here
        // const testSubscription = 'ACTIVE'
        // return fetch(`https://postman-echo.com/get?status=${testSubscription}&id=${userData.subscription_id}`)
        return (new Promise((resolve, reject) => {resolve('testUserStatus')}))
        .then(subscriptionData => {
            if (!subscriptionData.id) {
                subscriptionData.status = null
            }

            return [subscriptionData, userData]
        })
    })
    .then(([subscriptionData, userData]) => { 

        res.status(200).json({
            ...userData,
            hashedPassword: undefined,
            role: superUser ? userData.role : undefined,
            verified: superUser ? userData.verified : undefined,
            subscription: subscriptionData.status,
            ctime: undefined,
            mtime: undefined
        })
    })
})

router.post('/update', (req, res) => {
    const userData = req.body
    const user = req.user

    //TODO : VALIDATE DATA

    if (req.user && req.user.email) {
        if (userData.email !== user.email) {
            res.status(401).json({"error" : "Not Authenticated. Please log out and log in again."})
        }

        db.updateUser(userData)
        .then(newUserData => {
            purgeValues.forEach(val => {
                delete newUserData[val]
            })

            res.status(200).json(newUserData)
        })
        .catch(err => {
            console.log(err)

            res.status(500).json(err)
        })
    } else {
        db.createUser(userData)
        .then(newUserData => {
            purgeValues.forEach(val => {
                delete newUserData[val]
            })

            res.status(200).json(newUserData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }    
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({"error" : "Not Authenticated. Please log in again."})
    }
}

module.exports = router