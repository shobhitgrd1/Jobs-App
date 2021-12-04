const {register,login} = require('../controllers/auth')
const express = require('express')
const routes = express.Router();

routes.route('/register').post(register)
routes.route('/login').post(login)

module.exports = routes