const express = require('express')
const verifylogin = require('../config/jwt')

const { deleteUser, getUserById, createUser, login } = require('../controller/user')

const userrouter = express.Router()

userrouter.get('/:id', verifylogin, getUserById)
userrouter.delete('/:id', verifylogin, deleteUser)
userrouter.post('/login', login)
userrouter.post('/signup', createUser)


module.exports = userrouter
