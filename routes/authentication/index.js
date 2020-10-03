const express = require('express')
const authRoutes = express.Router()

//Importing models
const User = require('../../models/user.js');

//authentication middlewares
const Register = require('./register.js');
const SendConfirmation = require('./sendConfirmation.js')
const Verify = require('./verify.js');
const RemoveToken = require('./removetoken.js');

//Register Route
authRoutes.post('/register', Register(User), SendConfirmation(User), (req, res)=>{
    res.send('SUCCESS'.toLowerCase())
})

//Resend email Route
authRoutes.get('/resend', SendConfirmation(User), (req, res)=>{
    res.send('success')
})

//Email Confirmation route
authRoutes.get('/register/confirm/:code', Verify(), (req, res)=>{
    
})

//Token remove route
authRoutes.get('/token/remove', RemoveToken(User), (req, res)=>{
    res.send('success')
})


module.exports = authRoutes;
