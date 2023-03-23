
const express = require('express')
const { signUp, logIn } = require('../controllers/authUserController')
const authUserRoute = express.Router()



// đăng ký user 
authUserRoute.post('/signUp', signUp)

// đăng nhập 
authUserRoute.post('/logIn', logIn)

module.exports = authUserRoute