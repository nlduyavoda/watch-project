const express = require('express')
const router = express.Router()
const AuthController = require('../app/Controller/AuthController')
var jsonwrbtoken = require('jsonwebtoken');

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
module.exports = router
