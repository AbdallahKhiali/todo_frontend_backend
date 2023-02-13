const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    dueTo: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
});


const todoModel = mongoose.model('todos', TodoSchema)

module.exports = todoModel
