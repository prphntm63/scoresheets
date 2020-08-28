const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;

const db = require('./db');
const path = require('path')

const port = process.env.PORT || '5000';

var app = require('express')();
var server = require('http').Server(app);

if (process.env.NODE_ENV !== "production" ){
    require('dotenv').config();
}

passport.use(new LocalStrategy((username, password, done) => {
    db.authenticateUser(username, password)
    .then(user => {
        done(null, user)
    })
    .catch(err => {
        done(err)
    })
}))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.getUser(id)
    .then(user => {
        done(null, user)
    })
    .catch(err => {
        done(err)
    })
});

app.use(session({ 
    secret: "catsaremajesticanimals",
    name : "mashboard",
    proxy : true,
    resave : true,
    saveUninitialized : true
}));
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// API calls
let api = require('./routes/api')
let entries = require('./routes/api')
let users = require('./routes/users')
let competitions = require('./routes/competitions')
let sessions = require('./routes/sessions')
let scoresheets = require('./routes/scoresheets')
app.use('/api', api)
app.use('/entries', entries)
app.use('/users', users)
app.use('/competitions', competitions)
app.use('/sessions', sessions)
app.use('/scoresheets', scoresheets)

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(401).json({"user" : null}); }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        res.status(200).json(user)
      });
    })(req, res, next);
});

app.post('/logout', function(req,res,next) {
    req.logout()
    res.status(200).json({id : null})
})

if (process.env.NODE_ENV === "development" ){
    app.get('/', (req,res) => {
        res.redirect('http://localhost:4200')
    })
} else {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('/', (req,res) =>{
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
      res.redirect('/')
    }
}

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})