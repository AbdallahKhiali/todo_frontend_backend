const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    todos: [{ type: Schema.Types.ObjectId, ref: 'todos' }]
});


const userModel = mongoose.model('users', UserSchema)

module.exports = userModel