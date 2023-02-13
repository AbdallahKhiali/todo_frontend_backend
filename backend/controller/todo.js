const express = require('express');
const router = express.Router();
const todoModel = require('../model/todo');
const userModel = require('../model/user');


// Get a single todo
const getTodoById = (req, res) => {

    console.log('im here')
    todoModel.findById(req.params.id)
        .populate('user')
        .then(todo => {
            if (!todo) return res.status(404).json({ message: 'Todo not found' });
            res.json(todo);
        })
        .catch(error => res.status(500).json({ message: error.message }));
}




// Create a Todo for a specific User

const createTodo = async (req, res) => {
    try {

        const user = await userModel.findById(req.params.id)


        if (!user) return res.status(404).send({ error: 'User not found' });

        const todo = new todoModel({ ...req.body, user: user._id });
        await todo.save();

        console.log(user)

        user.todos.push(todo._id);
        await user.save();

        return res.send(todo);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

}


// Get all Todos for a specific User

const getTodos = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId)
            .populate('todos')
            .exec();
        if (!user) return res.status(404).send({ error: 'User not found' });

        return res.send(user.todos);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

}

// Delete all Todos for a specific User

const deleteTodoForUser = (req, res) => {


    userModel.findById(req.params.userId)
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            const todoIndex = user.todos.indexOf(req.params.todoId);
            if (todoIndex === -1) return res.status(404).json({ message: 'Todo not found' });
            user.todos.splice(todoIndex, 1);
            user.save()
                .then(() => res.json({ message: 'Todo deleted' }))
                .catch(error => res.status(400).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ message: error.message }));
};





module.exports = {
    getTodos, createTodo, getTodoById, deleteTodoForUser
};
