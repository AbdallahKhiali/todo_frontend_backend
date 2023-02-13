const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');

const jwt = require('jsonwebtoken');

// Create a new user

const createUser = (req, res) => {

    console.log(req.body)
    const user = new UserModel({
        email: req.body.email
    });

    user.save()
        .then(user => res.status(201).json(user))
        .catch(error => res.status(400).json({ message: error.message }));
}



// Get all users

const getUsers = (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(error => res.status(500).json({ message: error.message }));
}

// Get a single user
const getUserById = (req, res) => {
    UserModel.findById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        })
        .catch(error => res.status(500).json({ message: error.message }));
}
// Update a user


const updateUser = (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        })
        .catch(error => res.status(400).json({ message: error.message }));
}

const deleteUser = (req, res) => {
    // Delete a user
    UserModel.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json({ message: 'User deleted' });
        })
        .catch(error => res.status(500).json({ message: error.message }));

}

// Login a user
const login = (req, res) => {
    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.status(401).json({ message: 'Email  is incorrect' });
            const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
            const { _id, email } = user
            res.json({ token, user: { _id, email } })
            // res.json(user);
        })
        .catch(error => res.status(500).json({ message: error.message }));
};


module.exports = {
    deleteUser, login, getUserById, getUsers, updateUser, createUser
}
