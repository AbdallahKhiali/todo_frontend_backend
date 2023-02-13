const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Connection = require('./config/db');
var cors = require('cors');
const todorouter = require('./router/todo');
const userrouter = require('./router/user');

require('dotenv').config()


Connection()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


app.use("/users", userrouter)
app.use("/todos", todorouter)

app.listen(process.env.PORT || 3001, () => {
    console.log(`the server listening on port ${process.env.PORT}...`)
})