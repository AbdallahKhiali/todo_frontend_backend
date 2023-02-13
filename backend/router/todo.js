const express = require('express')
const { deleteTodoForUser, getTodos, createTodo, getTodoById } = require('../controller/todo')
const verifylogin = require('../config/jwt')

const todorouter = express.Router()

todorouter.get('/users/:userId', verifylogin, getTodos)
todorouter.post('/:id', verifylogin, createTodo)
todorouter.get('/:id', getTodoById)
todorouter.delete('/users/:userId/:todoId', deleteTodoForUser);







module.exports = todorouter